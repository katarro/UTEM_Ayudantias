const { DataTypes } = require("sequelize");
const sequelize = require("../models/db"); // Asegúrate de que esta ruta sea correcta para tu archivo de conexión

const Requisitos = sequelize.define(
  "requisitos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    requisito: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Opciones adicionales del modelo
    tableName: "requisitos", // Nombre de la tabla en la base de datos
    timestamps: false, // Si tu tabla no usa los campos `createdAt` y `updatedAt`, establece esto en false
  }
);

module.exports = Requisitos;
