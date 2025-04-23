const express = require('express');
const cors = require('cors');

const app = express();
const puerto = 2000;

app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE","PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
app.use(express.json());

const usuario = require('./router/usuariorouter');
const producto = require('./router/productorouter');


app.use('/usuarios',usuario);
app.use('/productos',producto);


app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});