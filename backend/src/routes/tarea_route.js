const express = require('express');
const router = express.Router();
const controller = require('../controllers/tarea_controller');

// Retorna todas las tareas. Utilizado durante el desarrollo
// router.get('/', controller.obtenerTareas);

// Retorna las tareas del usuario dado 
router.get('/:id', controller.obtenerTareas);

// Retorna las tareas del usuario dado con coincidencias
router.get('/:id/:filter', controller.obtenerTareasFiltradas);

// Crea una nueva tarea
router.post('/', controller.crearTarea);

// Edita la tarea dada
router.put('/:id', controller.editarTarea);

// Elimina la tarea dada
router.delete('/:id', controller.eliminarTarea);


module.exports = router;
