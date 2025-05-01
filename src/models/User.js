const db = require('../config/database');

class User {
    constructor(nombre, correo, contrasena) {
        this.nombre = nombre;
        this.correo = correo;
        this.contrasena = contrasena;
    }

    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM usuarios WHERE correo = ?';
            db.query(query, [email], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results[0]);
            });
        });
    }

    save() {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)';
            db.query(query, [this.nombre, this.correo, this.contrasena], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }

    static authenticate(email, password) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?';
            db.query(query, [email, password], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results[0]);
            });
        });
    }
}

module.exports = User; 