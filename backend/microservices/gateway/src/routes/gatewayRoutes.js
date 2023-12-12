// gatewayRoutes.js
require("dotenv").config();
const express = require("express");
const router = express.Router();
const postulacionesRoutes = require("../../../postulaciones-service/src/routes/postulacionesRoutes");
const adminRoutes = require("../../../administrador-service/src/routes/administradorRoutes");
const authRoutes = require("../../../login-service/src/routes/loginRoutes");

const {
  login,
} = require("../../../login-service/src/controllers/loginController");
const {
  sendEmail,
} = require("../../../login-service/src/controllers/registerController");
const {
  restablecerPassword,
} = require("../../../login-service/src/controllers/restablecerControler");

const { cambiarPassword } = require("../../../login-service/src/controllers/cambiarPassword");

// POSTULACIONES
router.post("/api/postular", postulacionesRoutes);
router.get("/api/estado/:rut", postulacionesRoutes);
router.get("/api/requisitos", postulacionesRoutes);

// ADMINISTRADOR
router.get("/api/adminin", adminRoutes);
router.get("/api/adminin/:rut", adminRoutes);
router.put("/api/adminin/:rut", adminRoutes);
router.post("/api/adminin/requisitos", adminRoutes);
router.delete("/api/adminin/requisito/:id", adminRoutes);

// LOGIN
router.post("/api/login", login);
router.post("/api/register-profesor", sendEmail);
router.post("/api/restablecer", restablecerPassword);
router.patch("/api/cambiar-contrasena",cambiarPassword);

module.exports = router;
