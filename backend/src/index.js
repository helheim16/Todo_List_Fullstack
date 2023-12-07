const express = require('express');
const app = express();
const port = 3000;
const tareaRoute = require('./routes/tarea_route');
const db = require('./config/db');
const cors = require('cors')

// Se instancia la conexion con la base de datos
db();

app.use(express.json());

app.use(cors());

// Middleware, imprime por consola datos de la solicitud
app.use((req, res, next) => {
    console.log(`reqTimestamp: ${new Date()}, ruta: ${req.url}, ipA: ${req.ip}, method: ${req.method}`);
    next();
});

// Middleware, indica que router se utilizarada con la ruta. 
app.use('/tarea', tareaRoute);

app.listen(port, () => console.log(`Servidor corriendo en puerto => ${port}!`));