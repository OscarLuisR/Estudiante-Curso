const { Schema } = require('mongoose');
const joi = require('joi');
const message = require('../libs/message');

const cursoSchema = new Schema (
    {
        nombre: {type: String, required: true, unique: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

cursoSchema.validaSchema = joi.object({
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
        })
});

module.exports = cursoSchema;