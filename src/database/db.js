const mongoose = require('mongoose');
const message = require('../libs/message');

let conn = null;

try {
    conn = mongoose.createConnection(`mongodb://${process.env.HOST}:${process.env.PORT_DB}/${process.env.DATABASE}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true 
    });

    conn.model('Estudiantes', require('../Schema/estudiante.schema'));
    conn.model('Cursos', require('../Schema/curso.schema'));
    
    console.log(message.ok(` Conectado a la Base de Datos ${process.env.DATABASE} `));

    } catch (error) {
        console.log(message.error(` Error: ${error} `));
}

module.exports = conn;