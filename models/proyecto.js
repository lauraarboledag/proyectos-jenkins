const { Schema, model } = require('mongoose')

const ProyectoSchema = Schema({
    
    numero: {
        type: String,
        required: [true, 'Numero requerido'],
        unique: [true, 'Proyecto creado']
    },
    titulo: {
        type: String,
        required: [true, 'titulo requerido']
    },

    fechaIniciacion: {
        type: Date,
        required: [true, 'fecha requerida']
    },

    fechaEntrega: {
        type: Date,
        required: [true, 'fecha requerida']
    },

    fechaCreacion: {
        type: Date,
        default: new Date()
        
    },

    fechaActualizacion: {
        type: Date,
        default: new Date()
     
    },

    Valor: {
        type: Number,
        required: [true, 'valor requerido']
    },

    tipoProyecto: {
        type: Schema.Types.ObjectId,
        ref: 'TipoProyecto',
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },

    universidad: {
        type: Schema.Types.ObjectId,
        ref: 'Universidad',
        required: true
    },

    etapas: {
        type: Schema.Types.ObjectId,
        ref: 'Etapas',
        required: true
    },






})

module.exports = model('Proyecto', ProyectoSchema)
