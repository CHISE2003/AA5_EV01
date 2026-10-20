/**
 * auth.routes.js
 * Define las rutas del servicio y las asocia con su controlador.
 */
const express = require('express');
const { registro, login } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/registro', registro); // Crear una cuenta
router.post('/login', login);       // Iniciar sesión

module.exports = router;
