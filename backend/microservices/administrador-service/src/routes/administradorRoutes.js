const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/api/adminin", adminController.consultaAll);
router.put("/api/adminin/:rut", adminController.updateState);

module.exports = router;
