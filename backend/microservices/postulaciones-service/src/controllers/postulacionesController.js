const Postulante = require("../models/postulanteModel");
const Requisito = require("../models/requisitosModel");
const { Sequelize } = require("sequelize");

const getRequirements = async (req, res) => {
  try {
    const requisitos = await Requisito.findAll();

    if (requisitos && requisitos.length > 0) {
      res.status(200).json({
        mensaje: "requisitos encontrados",
        requisitos: requisitos,
      });
    } else {
      res.status(404).json({ mensaje: "No se encontraron requisitos" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al consultar por los requisitos", error });
  }
};

const registrarPostulacion = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { nombre, rut, correo, codigo_carrera, asignatura, nota } = req.body;

    // Insertar la postulación en la base de datos
    const nuevaPostulacion = await Postulante.create({
      nombre,
      rut,
      correo,
      codigo_carrera,
      asignatura,
      nota,
      estado: "Pendiente", // Estado inicial
      pre_aprobacion: false, // Asumiendo que la pre-aprobación es falsa inicialmente
      // fecha_postulacion se establece automáticamente a la fecha actual si está configurada por defecto en la base de datos
    });

    // Si todo sale bien, enviar una respuesta exitosa
    res.status(201).json({
      mensaje: "Postulación registrada con éxito",
      postulacion: nuevaPostulacion,
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
        mensaje: "Error al registrar postulación",
        error: "El correo electrónico ya está registrado.",
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
    // Manejar errores (por ejemplo, entrada inválida, problemas de conexión a la base de datos, etc.)
    res.status(500).json({ mensaje: "Error al registrar postulación", error });
  }
};

const consultaOne = async (req, res) => {
  try {
    const { rut } = req.params;
    const postulacion = await Postulante.findOne({ where: { rut } });

    if (!postulacion) {
      console.log("Debug 1");
      return res.status(404).json({ mensaje: "Postulación no encontrada" });
    }

    res.status(200).json({
      mensaje: "Postulación encontrada",
      postulacion,
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al consultar postulación", error });
  }
};

module.exports = {
  getRequirements,
  registrarPostulacion,
  consultaOne,
};
