const db = require('../config/database');

class Book {
    constructor(titulo, categoria, autor, sinopsis, cantidad) {
        this.titulo = titulo;
        this.categoria = categoria;
        this.autor = autor;
        this.sinopsis = sinopsis;
        this.cantidad = cantidad;
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM libros';
            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    }

    save() {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO libros (titulo, categoria, autor, sinopsis, cantidad) VALUES (?, ?, ?, ?, ?)';
            db.query(query, [this.titulo, this.categoria, this.autor, this.sinopsis, this.cantidad], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM libros WHERE id = ?';
            db.query(query, [id], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }

    static update(id, data) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE libros SET titulo = ?, categoria = ?, autor = ?, sinopsis = ?, cantidad = ? WHERE id = ?';
            db.query(query, [data.titulo, data.categoria, data.autor, data.sinopsis, data.cantidad, id], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM libros WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results[0]);
            });
        });
    }
}

module.exports = Book; 