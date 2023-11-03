const { Pool } = require("pg");

const pool = new Pool({
  user: "utem",
  password: "utem",
  database: "utem",
  host: "localhost", // Asegúrate de que este sea el host correcto, especialmente si estás usando Docker
  port: "5432",
});

module.exports = pool;
