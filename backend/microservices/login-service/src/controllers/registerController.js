//registerController.js
require("dotenv").config();
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
const Profesor = require("../models/loginProfesorModel"); // Importa el modelo
const config = require("./config")
sgMail.setApiKey(config.API_EMAIL);
exports.sendEmail = async (req, res) => {
  const { nombre, correo } = req.body;

  const contrasena = crypto.randomBytes(3).toString("hex");
  const contrasenaHash = await bcrypt.hash(contrasena, 10);


  try {
    // Configurar el mensaje de correo electrónico
    const msg = {
      to: correo,
      from: "fcastro@utem.cl", // Reemplaza con tu dirección de correo verificada en SendGrid
      subject: "Bienvenido a la plataforma",
      text: `Hola ${nombre},\n\nTu cuenta ha sido creada. Tu contraseña es: ${contrasena}`,
    };

    // Intentar enviar el correo electrónico
    await sgMail.send(msg);

    // Si el correo se envía con éxito, crear el registro del profesor
    const nuevoProfesor = await Profesor.create({
      nombre: nombre,
      correo: correo,
      contrasena: contrasenaHash
    });

    res.status(200).send("Usuario registrado y correo enviado");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};
