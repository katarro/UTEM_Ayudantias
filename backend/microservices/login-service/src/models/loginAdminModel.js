const { DataTypes } = require("sequelize");
const sequelize = require("./db"); // Asegúrate de que esta ruta sea correcta para tu archivo de conexión

const Administrador = sequelize.define(
  "administradores", // Nombre de la tabla
  {
    // Define los atributos del modelo
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // Puedes agregar más campos aquí si tu tabla los tiene
  },
  {
    tableName: "administradores",
    timestamps: false // Ajusta según la estructura de tu tabla
  }
);

module.exports = Administrador;
