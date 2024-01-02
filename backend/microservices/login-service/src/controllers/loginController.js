//loginController.js
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Profesor = require("../models/loginProfesorModel"); // Importa el modelo
const Administrador = require("../models/loginAdminModel");
const admin = "mauro.castillo@utem.cl";

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let contrasena = password;
    let correo = email;

    console.log("Sin hash: ", password);
    // Buscar en profesores
    const profesor = await Profesor.findOne({ where: { correo } });

    if (profesor && (await bcrypt.compare(contrasena, profesor.contrasena))) {
      // Incluir userType y correo en el token
      const token = jwt.sign(
        { id: profesor.id, userType: "profesor", email: profesor.correo },
        "tuSecreto",
        {
          expiresIn: "1h",
        }
      );
      return res.json({ token, userType: "profesor" });
    } else {
      // Buscar en administradores si no se encuentra en profesores
      const administrador = await Administrador.findOne({ where: { correo } });


      if (
        administrador &&
        (await bcrypt.compare(contrasena, administrador.contrasena))
      ) {
        // Incluir userType y correo en el token
        const token = jwt.sign(
          {
            id: administrador.id,
            userType: "administrador",
            email: administrador.correo,
          },
          "tuSecreto",
          {
            expiresIn: "1h",
          }
        );
        return res.json({ token, userType: "administrador" });
      } else {
        // Si no se encuentra en ninguna de las dos tablas
        return res.status(401).send("Credenciales incorrectas");
      }
    }
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).send("Error en el servidor");
  }
};

//module.exports = authController;
