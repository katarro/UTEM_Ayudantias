require('dotenv').config(); // Esta línea debe estar al principio para cargar las variables de entorno
const { Sequelize } = require('sequelize');

// Configuración de conexión a la base de datos
const sequelize = new Sequelize("utem", "utem", "utem", {
  host: 'localhost', // Usa localhost si estás fuera de Docker y has mapeado los puertos correctamente
  port: "5432", // Asegúrate de que este puerto coincida con el mapeado en docker-compose.yml
  dialect: 'postgres',
});


module.exports = sequelize;
