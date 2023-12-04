const express = require('express');
const app = express();
const port = 3000;
const tareaRoute = require('./routes/tarea_route'); 
const db = require('./config/db');
const cors = require('cors')

db();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => res.send('HOLA MUNDO'));

app.use('/tarea', tareaRoute);

app.listen(port, () => console.log(`Servidor corriendo en puerto => ${port}!`));