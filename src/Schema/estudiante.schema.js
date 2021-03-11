const { Schema } = require('mongoose');
const joi = require('joi');
const message = require('../libs/message');
const mongoosePaginate = require('mongoose-paginate-v2');

const estudianteSchema = new Schema(
    {
        cedula: { type: Number, required: true, unique: true },
        nombre: { type: String, required: true },
        cursos: [{ type: Schema.Types.ObjectId, ref: 'Cursos'}]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

estudianteSchema.plugin(mongoosePaginate);

estudianteSchema.validaSchema = joi.object({
    cedula: joi.number()
        .integer()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar una Cedula";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar una Cedula Valida";                                             
                        break;
                    case "number.base":
                        err.message = "La Cedula debe ser un numero Entero Valido";                                             
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    nombre: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar un Nombre";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar un Nombre Valido";                                             
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    cursos: joi.array() // TODO: OJO OJO OJO PASAR A ObjectId
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar un Curso";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar un Curso Valido";                                             
                        break;
                    default:
                        break;
                }
            });

            return errors;
        })
});

module.exports = estudianteSchema;