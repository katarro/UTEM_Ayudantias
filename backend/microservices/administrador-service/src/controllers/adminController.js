const Postulante = require("../models/postulanteModel");

const consultaAll = async (req, res) => {
  try {
    const postulantes = await Postulante.findAll();

    if (postulantes && postulantes.length > 0) {
      res.status(200).json({
        mensaje: "Postulantes encontrados",
        postulantes: postulantes,
      });
    } else {
      res.status(404).json({ mensaje: "No se encontraron postulantes" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al consultar por los postulantes", error });
  }
};

const updateState = async (req, res) => {
  try {
    const { rut } = req.params; // Acceder al RUT desde los parámetros de la ruta
    const { estado } = req.body; // Acceder al estado desde el cuerpo de la solicitud

    // Buscar el postulante por RUT y actualizar su estado
    const postulante = await Postulante.findOne({ where: { rut } });

    if (!postulante) {
      return res.status(404).json({ mensaje: "Postulante no encontrado" });
    }

    postulante.estado = estado; // Actualizar el estado
    await postulante.save(); // Guardar los cambios en la base de datos

    res.json({ mensaje: "Estado actualizado con éxito", postulante });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el estado", error: error.message });
  }
};


module.exports = { consultaAll, updateState };
