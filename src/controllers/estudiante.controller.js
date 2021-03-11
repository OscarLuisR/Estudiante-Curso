const conn = require('../database/db');

const estudianteCtrl = {};

estudianteCtrl.getEstudiantes = async (req, res) => {
    try {
        const { page, paginationMin, paginationMax } = req.query;
        
        let max = 0, min = 0;
        let pagination = [];

        const results = await conn.model('Estudiantes').paginate({}, {select: '-createdAt -updatedAt', populate: {path: 'cursos', model: 'Cursos', select: '_id nombre '},  limit: 10, page});
        
        if (parseInt(paginationMin) > 0 && parseInt(paginationMax) > 0) {
            if ( results.totalPages <= 10 ){
                min = 1;
                max = results.totalPages;
            }else {
                if ( parseInt(page) >= parseInt(paginationMin) && parseInt(page) <= parseInt(paginationMax) ) {
                    min = parseInt(paginationMin);
                    max = parseInt(paginationMax);
                }else if (parseInt(page) > parseInt(paginationMax)) {
                    min = (parseInt(page) - 10 + 1);
                    max = parseInt(page);
                }else if (parseInt(page) < parseInt(paginationMin)) {
                    min = parseInt(page);
                    max = (parseInt(page) + 10) - 1;
                }
            }
            
            for (let index = min; index <= max; index++) {
                pagination.push(index);            
            }
        }
        
        let resultado = ({
            docs: results.docs,
            totalDocs: results.totalDocs,
            limit: results.limit,
            totalPages: results.totalPages,
            page: results.page,
            pagingCounter: results.pagingCounter,
            hasPrevPage: results.hasPrevPage,
            hasNextPage: results.hasNextPage,
            prevPage: results.prevPage,
            nextPage: results.nextPage,
            pagination: pagination
        });

        res.status(200).json({ status: 200, error: false, message: '', results: resultado});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

estudianteCtrl.getEstudianteId = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await conn.model('Estudiantes').findById({_id: id}, {_id: 1, cedula: 1, nombre: 1}).populate({ path: 'cursos', model: 'Cursos', select: '_id nombre' }).exec();

        res.status(200).json({ status: 200, error: false, message: '', results });

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

estudianteCtrl.createEstudiante = async (req, res) => {  
    // DA ERROR 
    /* try {
        const newEstudiante = conn.model('Estudiantes')(req.body);    

        const results = await newEstudiante.save();

        const cursos = await conn.model('Cursos').find({_id: results.cursos}, {_id: 1, nombre: 1});

        res.status(200).json({ status: 200, error: false, message: '', results: {_id: results._id, cedula: results.cedula, nombre: results.nombre, cursos: cursos }});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    } */
};

estudianteCtrl.updateEstudiante = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await conn.model('Estudiantes').findByIdAndUpdate({_id: id}, req.body, {new: true, select: '_id cedula nombre'}).populate({ path: 'cursos', model: 'Cursos', select: '_id nombre' }).exec();

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }  
};

estudianteCtrl.deleteEstudiante = async (req, res) => {
    const { id } = req.params;

    try {        
        const results = await conn.model('Estudiantes').findByIdAndDelete({_id: id}, {select: '_id cedula nombre cursos'}).populate({ path: 'cursos', model: 'Cursos', select: '_id nombre' }).exec();

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

module.exports = estudianteCtrl;