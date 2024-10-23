const express = require('express');
// const {
//     getAllProductos,
//     addProducto,
//     getProductoById,
//     editProducto,
//     deleteProducto,
// } = require('../controllers/productoController');

const {
    getAllProductos,
    addProducto,
    getProductoById,
    editProducto,
    deleteProducto,
} = require('../controllers/productoController2');

const router = express.Router();

// Rutas para rubros
router.get('/', getAllProductos); // Obtener todos los rubros
router.post('/', addProducto); // Agregar un nuevo rubro
router.get('/:id', getProductoById); // Obtener un rubro por ID
router.put('/:id', editProducto); // Editar un rubro
router.delete('/:id', deleteProducto); // Eliminar un rubro

module.exports = router;
