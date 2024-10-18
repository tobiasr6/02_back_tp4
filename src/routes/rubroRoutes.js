const express = require('express');
const {
    getAllRubros,
    addRubro,
    getRubroById,
    editRubro,
    deleteRubro,
} = require('../controllers/rubroController');

const router = express.Router();

// Rutas para rubros
router.get('/', getAllRubros); // Obtener todos los rubros
router.post('/', addRubro); // Agregar un nuevo rubro
router.get('/:id', getRubroById); // Obtener un rubro por ID
router.put('/:id', editRubro); // Editar un rubro
router.delete('/:id', deleteRubro); // Eliminar un rubro

module.exports = router;
