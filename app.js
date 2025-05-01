require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cors = require('cors');

// Importar rutas
const authRoutes = require('./src/routes/authRoutes');
const bookRoutes = require('./src/routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/libros', express.static(path.join(__dirname, 'public/libros')));

// Configuración de Content Security Policy
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://www.gstatic.com https://translate.googleapis.com https://translate.google.com; " +
        "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://www.gstatic.com https://translate.googleapis.com https://translate.google.com; " +
        "img-src 'self' data: https:; " +
        "font-src 'self' https://cdnjs.cloudflare.com; " +
        "connect-src 'self' https://www.gstatic.com https://translate.googleapis.com https://translate.google.com; " +
        "media-src *; " +
        "frame-src 'self' https://www.gstatic.com https://translate.googleapis.com https://translate.google.com; " +
        "style-src-elem 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://www.gstatic.com https://translate.googleapis.com https://translate.google.com"
    );
    next();
});

// Configuración de sesiones
app.use(session({
    secret: 'mi_secreto_seguro',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Usar las rutas
app.use('/', authRoutes);
app.use('/', bookRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta protegida del Dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'dashboard.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'register.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});