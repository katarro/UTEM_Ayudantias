//administradorRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/api/adminin", adminController.consultaAll);
router.put("/api/adminin/:rut", adminController.updateState);
router.post("/api/adminin/requisitos",adminController.CreateRequirement);
router.delete("/api/adminin/requisito/:id",adminController.deleteRequirement);
router.patch("/api/adminin/seleccionar",adminController.updateSellection);
router.post("/api/create-pdf",adminController.generatePdf);

module.exports = router;
