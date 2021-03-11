const conn = require('../database/db');

const cursoCtrl = {};

cursoCtrl.getCursos = async (req, res) => {
    try {
        const results = await conn.model('Cursos').find({}, {_id: 1, nombre: 1});
        
        res.status(200).json({ status: 200, error: false, message: '', results});        

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

cursoCtrl.getCursoId = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await conn.model('Cursos').findById({_id: id}, {_id: 1, nombre: 1});

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

cursoCtrl.createCurso = async (req, res) => {  
    try {
        const newCurso = conn.model('Cursos')(req.body);

        const results = await newCurso.save();
        
        res.status(200).json({ status: 200, error: false, message: '', results: {_id: results._id, nombre: results.nombre}});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

cursoCtrl.updateCurso = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await conn.model('Cursos').findByIdAndUpdate({_id: id}, req.body, {new: true, select: '_id nombre'});

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }  
};

cursoCtrl.deleteCurso = async (req, res) => {
    const { id } = req.params;

    try {        
        const results = await conn.model('Cursos').findByIdAndDelete({_id: id}, {select: '_id nombre'});

        res.status(200).json({ status: 200, error: false, message: '', results});
        
    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

module.exports = cursoCtrl;