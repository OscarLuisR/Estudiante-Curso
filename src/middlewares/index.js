const { verificaDatosLogin, verificaToken, verificaPermisoAdmin, verificaPermisoUser, verificaPermisoGuest } = require('./verificaAuth');
const { verificaDatosRegistroEstudiante, verificaDatosUpdateEstudiante, verificaParametrosPaginacion } = require('./verificaEstudiante');
const { verificaDatosRegistroCurso, verificaDatosUpdateCurso } = require('./verificaCurso');

module.exports = {
    verificaDatosLogin,
    verificaToken,
    verificaPermisoAdmin, 
    verificaPermisoUser,
    verificaPermisoGuest,
    verificaDatosRegistroEstudiante, 
    verificaDatosUpdateEstudiante,
    verificaParametrosPaginacion,
    verificaDatosRegistroCurso, 
    verificaDatosUpdateCurso    
};