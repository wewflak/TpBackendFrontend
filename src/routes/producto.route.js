//defino controlador para el manejo de CRUD
const productoCtrl = require('./../controllers/producto.controller');
//creamos el manejador de rutas
const express = require('express');
const router2 = express.Router();
//definimos las rutas para la gestion de producto
router2.get('/', productoCtrl.getProductos);
router2.post('/', productoCtrl.createProducto);
router2.get('/destacados', productoCtrl.getProductosDestacados);
router2.put('/:id', productoCtrl.editProducto);
router2.delete('/:id', productoCtrl.deleteProducto);
//exportamos el modulo de rutas
module.exports = router2;