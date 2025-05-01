const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const { getAllBooks, createBook, deleteBook, updateBook } = require('../controllers/bookController');

// Ruta para obtener todos los libros
router.get('/api/libros', getAllBooks);

// Ruta para agregar un nuevo libro
router.post('/api/libros', createBook);

// Ruta para eliminar un libro
router.delete('/api/libros/:id', deleteBook);

// Ruta para actualizar un libro
router.put('/api/libros/:id', updateBook);

module.exports = router; 