const conn = require('../database/db');
const estudianteSchema = require('../Schema/estudiante.schema');

const verificaEstuduante = {};

verificaEstuduante.verificaParametrosPaginacion = async (req, res, next) => {
    let page = req.query.page;
    let paginationMin = req.query.paginationMin;
    let paginationMax = req.query.paginationMax;

    try {
        // SE VERIFICA SI SE INGRESO EL PARAMETRO PAGE
        if (page !== undefined) {
            // SE VERIFICA SI EL PARAMETRO PAGE ES UN NUMERO VALIDO
            if (isNaN(page) || page.length <= 0 ) {
                return res.json({ status: 400, error: true, message: 'El parametro Page debe ser un numero valido', results: "" });
            }

            // SE VERIFICA SI EL PARAMETRO PAGE ES UN NUMERO ENTERO MAYOR A CERO
            if (parseInt(page) <= 0) {
                return res.json({ status: 400, error: true, message: 'El parametro Page debe ser un numero entero mayor a Cero', results: "" });
            }
        }else {
            // SE COLOCA VALOR POR DEFECTO AL PARAMETRO PAGE
            page = 1;
        }

        // SE VERIFICA SI SE INGRESO EL PARAMETRO PAGINATION MIN (VALOR MINIMO DEL ARRAY DE PAGINACION)
        if (paginationMin !== undefined) {
            // SE VERIFICA SI EL PARAMETRO PAGINATION MIN ES UN NUMERO VALIDO
            if (isNaN(paginationMin) || paginationMin.length <= 0 ) {
                return res.json({ status: 400, error: true, message: 'El parametro Pagination Min debe ser un numero valido', results: "" });
            }

            // SE VERIFICA SI EL PARAMETRO PAGINATION MIN ES UN NUMERO ENTERO MAYOR A CERO
            if (parseInt(paginationMin) <= 0) {
                return res.json({ status: 400, error: true, message: 'El parametro Pagination Min debe ser un numero entero mayor a Cero', results: "" });
            }
        }else {
            // SE COLOCA VALOR POR DEFECTO AL PARAMETRO PAGINATION MIN
            paginationMin = 0;
        }

        // SE VERIFICA SI SE INGRESO EL PARAMETRO PAGINATION MAX (VALOR MAXIMO DEL ARRAY DE PAGINACION)
        if (paginationMax !== undefined) {
            // SE VERIFICA SI EL PARAMETRO PAGINATION MAX ES UN NUMERO VALIDO
            if (isNaN(paginationMax) || paginationMax.length <= 0 ) {
                return res.json({ status: 400, error: true, message: 'El parametro Pagination Max debe ser un numero valido', results: "" });
            }

            // SE VERIFICA SI EL PARAMETRO PAGINATION MAX ES UN NUMERO ENTERO MAYOR A CERO
            if (parseInt(paginationMax) <= 0) {
                return res.json({ status: 400, error: true, message: 'El parametro Pagination Max debe ser un numero entero mayor a Cero', results: "" });
            }
        }else {
            // SE COLOCA VALOR POR DEFECTO AL PARAMETRO PAGINATION MAX
            paginationMax = 0;
        }

        // SE VERIFICA QUE EL PARAMETRO PAGINATION MIN NO SEA MAYOR AL PARAMETRO PAGINATION MAX
        if (parseInt(paginationMin) > parseInt(paginationMax)) {
            return res.json({ status: 400, error: true, message: 'El parametro Pagination Min no puede ser mayor al parametro Pagination Max', results: "" });
        }

        // SE AGREGRAN LOS PARAMETROS COMO PROPIEDADES
        req.query.page = page;
        req.query.paginationMin = paginationMin;
        req.query.paginationMax = paginationMax;
        
        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

verificaEstuduante.verificaDatosRegistroEstudiante = async (req, res, next) => {
    const { cedula, cursos } = req.body;

    try {

        const { error } = await estudianteSchema.validaSchema.validate(req.body);

        if (error) {
            return res.json({ status: 400, error: true, message: error.details[0].message, results: "" });
        }

        // VERIFICAR SI LA CEDULA YA EXISTE EN LA BD
        const cedulaFind = await conn.model('Estudiantes').findOne({ cedula: cedula });

        if (cedulaFind) {
            return res.json({ status: 400, error: true, message: 'Cedula Ya Existe', results: "" });
        }

        // VERIFICAR SI SE INGRESO UN ID DE CURSO EN EL BODY
        if (cursos.length <= 0 ) {
            return res.json({ status: 400, error: true, message: 'Debe ingresar un Curso Valido', results: "" });
        }

        // VERIFICAR SI LOS ID DE LOS CURSOS EXISTEN EN LA BD
        const cursosFind = await conn.model('Cursos').find({_id: cursos});

        if (cursos.length != cursosFind.length) {
            return res.json({ status: 400, error: true, message: 'Cursos Asignado es Invalido', results: "" });
        }

        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

verificaEstuduante.verificaDatosUpdateEstudiante = async (req, res, next) => {
    const { cedula, nombre, cursos} = req.body;
    const { id } = req.params;

    try {
        const { error } = await estudianteSchema.validaSchema.validate(req.body);

        if (error) {
            // VERIFICAR QUE CAMPOS SE INGRESARON PARA COMPROBAR SI YA EXISTEN EN LA BD
            if ((cedula !== undefined && error.details[0].context.key == 'cedula') || 
                (nombre !== undefined && error.details[0].context.key == 'nombre') || 
                (cursos !== undefined && error.details[0].context.key == 'cursos')) {
                    return res.json({ status: 400, error: true, message: error.details[0].message, results: "" });
            }
        }

        // SI SE INGRESO LA CEDULA SE VERIFICA SI YA EXISTE EN LA BD
        if (cedula !== undefined) {
            const cedulaFind = await conn.model('Estudiantes').findOne({ cedula: cedula });

            if (cedulaFind) {
                if (id != cedulaFind._id) {
                    return res.json({ status: 400, error: true, message: 'Cedula Ya Existe', results: "" });
                }
            }
        }

        // VERIFICAR SI LOS ID DE LOS CURSOS EXISTEN EN LA BD
        if (cursos !== undefined) {
            // VERIFICAR SI SE INGRESO UN ID DE CURSO EN EL BODY
            if (cursos.length <= 0 ) {
                return res.json({ status: 400, error: true, message: 'Debe ingresar un Curso Valido', results: "" });
            }

            const cursosFind = await conn.model('Cursos').find({_id: cursos});

            if (cursos.length != cursosFind.length) {
                return res.json({ status: 400, error: true, message: 'Cursos Asignado es Invalido', results: "" });
            }
        }

        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

module.exports = verificaEstuduante;