const { DataTypes } = require("sequelize");
const sequelize = require("../models/db"); // Asegúrate de que esta ruta sea correcta para tu archivo de conexión

const Postulante = sequelize.define(
  "postulantes",
  {
    // Aquí defines los atributos del modelo, basados en la estructura de tu tabla SQL
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rut: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    codigo_carrera: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    asignatura: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nota: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: false,
      validate: {
        min: 1.0,
        max: 7.0,
      },
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Pendiente", "Rechazado", "Aprobado"]],
      },
    },
    pre_aprobacion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    fecha_postulacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    observacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Opciones adicionales del modelo
    tableName: "postulantes", // Nombre de la tabla en la base de datos
    timestamps: false, // Si tu tabla no usa los campos `createdAt` y `updatedAt`, establece esto en false
  }
);

module.exports = Postulante;
