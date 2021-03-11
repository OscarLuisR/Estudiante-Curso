const conn = require('../database/db');
const cursoSchema = require('../Schema/curso.schema');


const verificaCurso = {};

verificaCurso.verificaDatosRegistroCurso = async (req, res, next) => {
    const { nombre } = req.body;

    try {
        const { error } = await cursoSchema.validaSchema.validate(req.body);

        if (error) {
            return res.json({ status: 400, error: true, message: error.details[0].message, results: "" });
        }

        // VERIFICAR SI EL NOMBRE YA EXISTE EN LA BD
        const nombreFind = await conn.model('Cursos').findOne({ nombre: nombre });

        if (nombreFind) {
            return res.json({ status: 400, error: true, message: 'Nombre Ya Existe', results: "" });
        }

        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

verificaCurso.verificaDatosUpdateCurso = async (req, res, next) => {
    const { nombre } = req.body;
    const { id } = req.params;

    try {
        const { error } = await cursoSchema.validaSchema.validate(req.body);

        if (error) {
            // VERIFICAR QUE CAMPOS SE INGRESARON PARA COMPROBAR SI YA EXISTEN EN LA BD
            if ((nombre !== undefined && error.details[0].context.key == 'nombre')) {
                return res.json({ status: 400, error: true, message: error.details[0].message, results: "" });
            }
        }

        // SI SE INGRESO EL NOMBRE SE VERIFICA SI YA EXISTE EN LA BD
        if (nombre !== undefined) {
            const nombreFind = await conn.model('Cursos').findOne({ nombre: nombre });

            if (nombreFind) {
                if (id != nombreFind._id) {
                    return res.json({ status: 400, error: true, message: 'Nombre Ya Existe', results: "" });
                }
            }
        }

        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

module.exports = verificaCurso;