const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('HOLA MUNDO'));
<<<<<<< HEAD
app.listen(port, () => console.log(`Servidor corriendo en puerto => ${port}!`));
=======
app.listen(port, () => console.log(`Servidor corriendo en puerto => ${port}!`));
// hola
>>>>>>> a9677da649623df1ff2f4514938eddc499d387b8
