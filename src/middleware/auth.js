function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('Acceso no autorizado');
    }
}

module.exports = {
    isAuthenticated
}; 