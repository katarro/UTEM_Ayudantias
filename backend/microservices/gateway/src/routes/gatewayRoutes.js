const express = require('express');
const router = express.Router();
const postulacionesRoutes = require('../../../postulaciones-service/src/routes/postulacionesRoutes');
const adminRoutes = require('../../../administrador-service/src/routes/administradorRoutes')


// POSTULACIONES
router.post('/api/postular', postulacionesRoutes);
router.get('/api/estado/:rut', postulacionesRoutes);


// ADMINISTRADOR
router.get('/api/adminin', adminRoutes);
router.put('/api/adminin/:rut', adminRoutes);

module.exports = router;
