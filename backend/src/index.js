const express = require('express');
const app = express();
const port = 3000;
const tareaRoute = require('./routes/tarea_route');
const db = require('./config/db');
const cors = require('cors')

db();

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
    console.log(`reqTimestamp: ${new Date()}, ruta: ${req.url}, ipA: ${req.ip}, method: ${req.method}`);
    next();
});

app.use('/tarea', tareaRoute);

app.listen(port, () => console.log(`Servidor corriendo en puerto => ${port}!`));