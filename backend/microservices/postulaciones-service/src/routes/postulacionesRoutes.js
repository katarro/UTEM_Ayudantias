const express = require('express');
const router = express.Router();
const postulacionesController = require('../controllers/postulacionesController');

router.post('/api/postular', postulacionesController.registrarPostulacion);
router.get('/api/estado/:rut', postulacionesController.consultaOne);

module.exports = router;
