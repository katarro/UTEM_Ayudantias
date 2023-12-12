require('dotenv').config(); // Asegúrate de requerir dotenv al inicio si usas un archivo .env
const { Sequelize } = require('sequelize');

// Configuración de conexión a la base de datos utilizando variables de entorno
const sequelize = new Sequelize(
  process.env.POSTGRESQL_ADDON_DB, // Nombre de la base de datos
  process.env.POSTGRESQL_ADDON_USER, // Usuario
  process.env.POSTGRESQL_ADDON_PASSWORD, // Contraseña
  {
    host: process.env.POSTGRESQL_ADDON_HOST, // Host
    port: process.env.POSTGRESQL_ADDON_PORT, // Puerto
    dialect: 'postgres', // Dialecto de la base de datos
  }
);

// Prueba la conexión
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

testConnection();

module.exports = sequelize;
