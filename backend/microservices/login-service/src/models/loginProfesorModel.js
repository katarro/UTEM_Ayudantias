const { DataTypes } = require("sequelize");
const sequelize = require("./db"); // Asegúrate de que esta ruta sea correcta para tu archivo de conexión

const Profesor = sequelize.define(
  "profesores", // Nombre de la tabla
  {
    // Define los atributos del modelo
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre:{
      type: DataTypes.STRING,
      allowNull: false,
      
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
    tableName: "profesores",
    timestamps: false // Ajusta según la estructura de tu tabla
  }
);

module.exports = Profesor;
