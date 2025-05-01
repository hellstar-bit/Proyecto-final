const Book = require('../models/Book');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.getAll();
        res.status(200).json(books);
    } catch (err) {
        console.error('Error al obtener los libros:', err);
        res.status(500).send('Error interno del servidor');
    }
};

const createBook = async (req, res) => {
    const { titulo, categoria, autor, sinopsis, cantidad } = req.body;

    if (!titulo || !categoria || !autor || !sinopsis || cantidad === undefined) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        const book = new Book(titulo, categoria, autor, sinopsis, cantidad);
        await book.save();
        res.status(201).send('Libro agregado exitosamente');
    } catch (err) {
        console.error('Error al agregar el libro:', err);
        res.status(500).send('Error interno del servidor');
    }
};

const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        await Book.delete(id);
        res.status(200).send('Libro eliminado exitosamente');
    } catch (err) {
        console.error('Error al eliminar el libro:', err);
        res.status(500).send('Error interno del servidor');
    }
};

const updateBook = async (req, res) => {
    const { id } = req.params;
    const { titulo, categoria, autor, sinopsis, cantidad } = req.body;

    if (!titulo || !categoria || !autor || !sinopsis || cantidad === undefined) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        await Book.update(id, { titulo, categoria, autor, sinopsis, cantidad });
        res.status(200).send('Libro actualizado exitosamente');
    } catch (err) {
        console.error('Error al actualizar el libro:', err);
        res.status(500).send('Error interno del servidor');
    }
};

module.exports = {
    getAllBooks,
    createBook,
    deleteBook,
    updateBook
}; 