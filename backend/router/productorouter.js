
const express = require('express');

const Producto = require('../controller/productocontrollers');

const router = express.Router();

const protegerrutas = require('../middleware/protegerrutas');



router.get('/producto',protegerrutas, Producto.listarProducto);

router.post('/producto',protegerrutas, Producto.crearProducto);


router.delete('/eliminar/:id',protegerrutas, Producto.eliminarProducto);

router.put('/producto/:id',protegerrutas, Producto.actualizarProducto);

router.get('/producto/:id',protegerrutas, Producto.BuscarProducto);



module.exports = router;