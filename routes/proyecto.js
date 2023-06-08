const { Router } = require('express')
const { getProyecto, createProyecto, updateProyectoByID} =
 require('../controllers/proyecto')

const router = Router()

// crear todos
router.post('/', createProyecto)

// consultar todos
router.get('/', getProyecto)

// Actualizar todos

router.put('/', updateProyectoByID)

module.exports = router;

