const express = require("express");
const app = express();
const routerApi = require("./routes/gatewayRoutes")
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 4000;
app.use(express.json()); // Middleware para parsear JSON
app.use(cors());


// Enruta a los microservicios correspondientes
app.use(routerApi)


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`On poart ${PORT}`);
});

// Agregar memcached aqui