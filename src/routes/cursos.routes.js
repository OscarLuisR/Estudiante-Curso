const router = require('express').Router();
const cursoCtrl = require('../controllers/curso.controller');
const { verificaToken, verificaPermisoAdmin, verificaParametrosPaginacion, verificaDatosRegistroCurso, verificaDatosUpdateCurso } = require('../middlewares/index');

router.get('/', [verificaToken, verificaPermisoAdmin, verificaParametrosPaginacion], cursoCtrl.getCursos);
router.get('/:id', [verificaToken, verificaPermisoAdmin], cursoCtrl.getCursoId);
router.post('/', [verificaToken, verificaPermisoAdmin, verificaDatosRegistroCurso], cursoCtrl.createCurso);
router.put('/:id', [verificaToken, verificaPermisoAdmin, verificaDatosUpdateCurso], cursoCtrl.updateCurso);
router.delete('/:id', [verificaToken, verificaPermisoAdmin], cursoCtrl.deleteCurso);

module.exports = router;