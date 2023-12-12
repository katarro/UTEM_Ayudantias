const bcrypt = require("bcrypt");
const Profesor = require("../models/loginProfesorModel"); // Importa el modelo
const Administrador = require("../models/loginAdminModel");

exports.cambiarPassword = async (req, res) => {
  const { correo, contrasenaNueva, contrasenaActual } = req.body;
  let nuevaContraseña = contrasenaNueva;
  let contraseñaActual = contrasenaActual;

  console.log(nuevaContraseña);
  console.log(req.body);

  try {
    // Buscar el usuario por correo electrónico
    let usuario =
      (await Profesor.findOne({ where: { correo } })) ||
      (await Administrador.findOne({ where: { correo } }));

    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }

    // Verificar la contraseña actual
    const contraseñaValida = await bcrypt.compare(
      contraseñaActual,
      usuario.contrasena
    );
    if (!contraseñaValida) {
      return res.status(401).send("Contraseña actual incorrecta");
    }

    // Hashear la nueva contraseña
    const nuevaContrasenaHash = await bcrypt.hash(contrasenaNueva, 10);

    // Actualizar la contraseña del usuario
    usuario.contrasena = nuevaContrasenaHash;
    await usuario.save();

    res.status(200).send("Contraseña actualizada con éxito");
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};
