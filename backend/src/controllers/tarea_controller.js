const Tarea = require('../models/tarea_model');

const tareaController = {
    obtenerTareas: async (req, res) => {
        const idUsuario = req.params.id;
        try {
            const tareas = await Tarea.find({user: idUsuario});
            res.status(200);
            res.json(tareas);
        } catch (error) {
            console.error(error);
            res.status(500);
            res.send(`Fallo al obtener tareas`);
        }
    },

    crearTarea: async (req, res) => {
        // console.log(req.body)
        const { title, desc, completed, important, user } = req.body;
        const nuevaTarea = new Tarea({ title, desc, completed, important, user });

        try {
            await nuevaTarea.save();
            res.status(201);
            res.json(nuevaTarea);
        } catch (error) {
            console.error(error);
            res.status(500);
            res.send(`Fallo al crear tarea`);
        }
    },

    editarTarea: async (req, res) => {
        const id = req.params.id;
        const { title, desc, completed, important, user } = req.body;

        try {
            const result = await Tarea.updateOne({ _id: id }, { $set: { title, desc, completed, important, user } });
            if (result.matchedCount === 1) {
                res.status(200);
                res.send(`Tarea ${id} editada correctamente`);
            } else {
                res.status(404);
                res.send(`No se econtro la tarea`);
            }
        } catch (error) {
            console.error(error);
            res.status(500);
            res.send(`Fallo al editar tarea`);
        }
    },

    eliminarTarea: async (req, res) => {
        const id = req.params.id;

        try {
            await Tarea.deleteOne({ _id: id });
            res.status(200);
            res.send(`Tarea ${id} eliminada.`);
        } catch (error) {
            console.error(error);
            res.status(500);
            res.send(`Fallo al eliminar tarea`);
        }
    }
}

module.exports = tareaController;
