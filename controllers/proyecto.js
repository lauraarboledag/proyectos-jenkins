const Proyecto = require('../models/proyecto')
const { request, response} = require('express')
const Cliente = require('../models/cliente')
const TipoProyecto = require('../models/tipoProyecto')
const Universidad = require('../models/universidad')
const Etapas = require('../models/etapas')


// Crear Proyecto

const createProyecto= async (req = request, 
    res = response) => {
    try{
        const data = req.body
        console.log(data)
        const {cliente, tipoProyecto} = data;

        if (!cliente._id) {
            return res.status(400).json({msg:"No ha ingresado el id del cliente"})
            
        } else {
            if (!/^[0-9a-fA-F]{24}$/.test(cliente._id))
                return res.status(400).json ({msg: "Id invalido"})
            
        }
            

        if (!tipoProyecto._id) {
            return res.status(400).json({msg:"No ha ingresado el id del tipo proyecto"})

        } else {
            if (!/^[0-9a-fA-F]{24}$/.test(tipoProyecto._id))
                return res.status(400).json ({msg: "Id invalido"})
            
        }

        //Validación Tipo Proyecto
        
        const tipoProyectoDB = TipoProyecto.findOne({
            _id: tipoProyecto._id,
            estado: true
            
        })
        if(!tipoProyectoDB){
            return res.status(404).json({msg: 'Tipo Proyecto invalido'})
        }
        
        // validando Cliente

        const clienteDB = Cliente.findOne({
            _id: cliente._id,
        })
        if(!clienteDB){
            return res.status(404).json({msg: 'cliente invalido'})
        }

        const proyecto = new Proyecto(data)
        await proyecto.save()

        return res.status(201).json(proyecto)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

// Listar Proyecto

const getProyecto = async (req = request, 
    res = response) => {
        try{
            const proyectoDB = await Proyecto.find({})
                .populate({
                    path: 'tipoProyecto',
                })
                .populate({
                    path: 'cliente',
                })

                .populate({
                    path: 'universidad',
                })

                .populate({
                    path: 'etapas',
                })
               
            return res.json(proyectoDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

// Actualizar proyecto

const updateProyectoByID = async (req = request, 
    res = response) => {

    try{
        const { id } = req.params
        const data = req.body
        data.fechaActualizacion = new Date()
        const proyecto  = await Proyecto.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(proyecto)
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'}) 
    }

}


module.exports = 
{ createProyecto, 
    getProyecto, 
    updateProyectoByID }