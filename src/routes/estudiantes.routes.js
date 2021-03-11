const router = require('express').Router();
const estudianteCtrl = require('../controllers/estudiante.controller');
const { verificaToken, verificaPermisoAdmin, verificaParametrosPaginacion, verificaDatosRegistroEstudiante, verificaDatosUpdateEstudiante } = require('../middlewares/index');

router.get('/', [verificaToken, verificaPermisoAdmin, verificaParametrosPaginacion], estudianteCtrl.getEstudiantes);
router.get('/:id', [verificaToken, verificaPermisoAdmin], estudianteCtrl.getEstudianteId);
router.post('/', [verificaToken, verificaPermisoAdmin, verificaDatosRegistroEstudiante], estudianteCtrl.createEstudiante);
router.put('/:id', [verificaToken, verificaPermisoAdmin, verificaDatosUpdateEstudiante], estudianteCtrl.updateEstudiante);
router.delete('/:id', [verificaToken, verificaPermisoAdmin], estudianteCtrl.deleteEstudiante);

module.exports = router;