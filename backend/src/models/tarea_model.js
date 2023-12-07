const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: { type: String, require: true },
    desc: { type: String, require: true},
    date: { type: String, require: true },
    completed: { type: Boolean, require: true },
    important: Boolean,
    user: String,
});

const Tarea = mongoose.model('Tarea', tareaSchema);

// Schema Tarea
module.exports = Tarea;