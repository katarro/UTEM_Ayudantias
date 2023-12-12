const express = require('express');
const router = express.Router();
const postulacionesController = require('../controllers/postulacionesController');

router.post('/api/postular', postulacionesController.registrarPostulacion);
router.get('/api/estado/:rut', postulacionesController.consultaOne);
router.get('/api/requisitos', postulacionesController.getRequirements);


module.exports = router;
