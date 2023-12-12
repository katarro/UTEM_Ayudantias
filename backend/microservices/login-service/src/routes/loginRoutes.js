//loginRoutes.js
const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");

router.post("/api/login", loginController.login);
router.post("/api/register-profesor", registerController.sendEmail);

module.exports = router;
