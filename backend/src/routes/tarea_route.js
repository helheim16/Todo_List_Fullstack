const express = require('express');
const router = express.Router();
const controller = require('../controllers/tarea_controller');

// Retorna todas las tareas
router.get('/', controller.obtenerTareas);

// Retorna la tarea solicitada 
router.get('/', controller.obtenerTareas);

// Crea una nueva tarea
router.post('/', controller.crearTarea);

// Edita la tarea dada
router.put('/:id', controller.editarTarea);

// Elimina la tarea dada
router.delete('/:id', controller.eliminarTarea);


module.exports = router;