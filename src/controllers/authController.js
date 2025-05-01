const User = require('../models/User');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).send('El correo ya está registrado');
        }

        const user = new User(name, email, password);
        await user.save();
        res.status(200).send('Usuario registrado exitosamente');
    } catch (err) {
        console.error('Error al registrar el usuario:', err);
        res.status(500).send('Error interno del servidor');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        const user = await User.authenticate(email, password);
        if (user) {
            req.session.user = { id: user.id, email: user.correo };
            res.status(200).send('Inicio de sesión exitoso');
        } else {
            res.status(401).send('Correo o contraseña incorrectos');
        }
    } catch (err) {
        console.error('Error al autenticar el usuario:', err);
        res.status(500).send('Error interno del servidor');
    }
};

module.exports = {
    register,
    login
}; 