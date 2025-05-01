const express = require('express');
const router = express.Router();
const path = require('path');
const { register, login } = require('../controllers/authController');

// Ruta para la página de registro
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../register.html'));
});

// Ruta para manejar el registro
router.post('/api/register', register);

// Ruta para manejar el inicio de sesión
router.post('/api/login', login);

module.exports = router; 