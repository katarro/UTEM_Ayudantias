const Postulante = require("../models/postulanteModel");
const Requisitos = require("../models/requisitosModel");

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
    const { estado, observacion } = req.body; // Acceder al estado desde el cuerpo de la solicitud
    console.log("body: ", req.body);
    console.log("estado: ", estado);
    console.log("observacion: ", observacion);

    // Buscar el postulante por RUT y actualizar su estado
    const postulante = await Postulante.findOne({ where: { rut } });

    if (!postulante) {
      return res.status(404).json({ mensaje: "Postulante no encontrado" });
    }

    postulante.estado = estado; // Actualizar el estado
    postulante.observacion = observacion;
    await postulante.save(); // Guardar los cambios en la base de datos

    res.json({ mensaje: "Estado actualizado con éxito", postulante });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al actualizar el estado", error: error.message });
  }
};

const CreateRequirement = async (req, res) => {
  try {
    const { requisito } = req.body;
    const nuevoRequisito = await Requisitos.create({ requisito });

    res.status(201).json({
      mensaje: "Requisito registrado con éxito",
      requisito: nuevoRequisito,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      // Si hay un error de validación, responde con detalles específicos
      const errores = error.errors.map((err) => ({
        message: err.message,
        field: err.path,
      }));
      return res.status(400).json({ mensaje: "Error de validación", errores });
    }

    // Verificar si el error es una violación de restricción única para el correo
    if (
      error instanceof Sequelize.UniqueConstraintError &&
      error.fields.correo
    ) {
      return res.status(400).json({
        mensaje: "Error al registrar requisito",
        error: "El requisito ya está registrado.",
      });
    }

    // Si el error es un error de validación pero no una violación de restricción única
    if (error instanceof Sequelize.ValidationError) {
      const errores = error.errors.map((err) => ({
        message: err.message,
        field: err.path,
      }));
      return errores;
    }
    res.status(500).json({ mensaje: "Error al registrar requisito", error });
  }
};

const deleteRequirement = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del requisito desde los parámetros de la ruta

    const result = await Requisitos.destroy({
      where: { id: id },
    });

    if (result === 0) {
      return res.status(404).json({ message: "Requisito no encontrado" });
    }

    res.status(200).json({ message: "Requisito eliminado con éxito" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el requisito",
      error: error.message,
    });
  }
};

const updateSellection = async (req, res) => {
  try {
    // Obtener el ID del postulante y el nuevo valor de pre_aprobacion desde el cuerpo de la solicitud
    const { rut, preAprobacion } = req.body;
    console.log(rut)
    console.log(preAprobacion)

    // Verifica que se haya proporcionado el ID del postulante y el nuevo valor de pre_aprobacion
    if (!rut || preAprobacion === undefined) {
      return res
        .status(400)
        .send({ message: "Faltan datos necesarios para la actualización." });
    }

    // Actualizar el campo pre_aprobacion del postulante
    const resultado = await Postulante.update(
      { pre_aprobacion: preAprobacion },
      {
        where: { rut: rut },
      }
    );

    if (resultado[0] === 0) {
      // Ningún registro fue actualizado (posiblemente porque no se encontró el postulante)
      return res.status(404).send({ message: "Postulante no encontrado." });
    }

    // Enviar respuesta exitosa
    res.send({ message: "Pre-aprobación actualizada con éxito." });
  } catch (error) {
    console.error("Error al actualizar la selección:", error);
    res.status(500).send({ message: "Error interno del servidor." });
  }
};

module.exports = {
  consultaAll,
  updateState,
  CreateRequirement,
  deleteRequirement,
  updateSellection,
};
