const {Schema, model} = require('mongoose')

const universidadSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido']
    },

    direccion: {
        type: String,
        required: [true, 'dirección requerida']
    },

    telefono: {
        type: String,
        required: [true, 'teléfono requerido'],
        unique: [true, 'teléfono existente']
    },

    fechaCreacion: {
        type: Date,
        default: new Date()
    },

    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
})

module.exports = model('Universidad', universidadSchema)
