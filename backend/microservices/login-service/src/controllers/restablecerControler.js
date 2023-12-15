require("dotenv").config();
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');

const Profesor = require("../models/loginProfesorModel"); // Importa el modelo de profesor
const Administrador = require("../models/loginAdminModel"); // Importa el modelo de administrador

exports.restablecerPassword = async (req, res) => {


  const { correo } = req.body;

  try {
    let usuario = await Profesor.findOne({ where: { correo } });

    if (!usuario) {
      usuario = await Administrador.findOne({ where: { correo } });
    }

    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }

    // Generar una nueva contraseña temporal
    const nuevaContrasena = crypto.randomBytes(3).toString("hex");
    const contrasenaHash = await bcrypt.hash(nuevaContrasena, 10);
    usuario.contrasena = contrasenaHash;
    console.log(nuevaContrasena)
    await usuario.save();

    // Configurar el mensaje de correo electrónico
    const msg = {
      to: correo,
      from: "fcastro@utem.cl", // Reemplaza con tu dirección de correo verificada en SendGrid
      subject: "Restablecimiento de contraseña",
      text: `Hola,\n\nTu nueva contraseña temporal es: ${nuevaContrasena}\nPor favor cambia esta contraseña lo antes posible.`,
    };

    // Enviar el correo electrónico
    await sgMail.send(msg);
    res.status(200).send("Correo con la nueva contraseña temporal enviado");
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};
