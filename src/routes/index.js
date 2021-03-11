const  routes = require('express').Router();

routes.use('/api/auth', require('./auth.routes'));
routes.use('/api/estudiantes', require('./estudiantes.routes'));
routes.use('/api/cursos', require('./cursos.routes'));

module.exports = routes;