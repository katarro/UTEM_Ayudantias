const { Pool } = require("pg");

const pool = new Pool({
  user: "utem",
  password: "utem",
  database: "utem",
  host: "localhost", // Asegúrate de que este sea el host correcto, especialmente si estás usando Docker
  port: "5432",
});

const queryDatabase = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log(res.rows[0]);
  } catch (err) {
    console.error(err.stack);
  } finally {
    await pool.end();
  }
};

queryDatabase();
