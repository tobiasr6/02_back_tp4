const pool = require('../config/db'); // Importar el pool de conexiones

// Obtener todos los rubros
const getAllRubros = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM Rubro');
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo rubro
const addRubro = async (req, res) => {
    const { DescripcionRub } = req.body;
    try {
        const [results] = await pool.query('INSERT INTO Rubro (DescripcionRub) VALUES (?)', [DescripcionRub]);
        res.status(201).json({ idRubroCod: results.insertId, DescripcionRub });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un rubro por ID
const getRubroById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await pool.query('SELECT * FROM Rubro WHERE idRubroCod = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Rubro no encontrado' });
        }
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un rubro
const editRubro = async (req, res) => {
    const { id } = req.params;
    const { DescripcionRub } = req.body;
    try {
        await pool.query('UPDATE Rubro SET DescripcionRub = ? WHERE idRubroCod = ?', [DescripcionRub, id]);
        res.json({ idRubroCod: id, DescripcionRub });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un rubro
const deleteRubro = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Rubro WHERE idRubroCod = ?', [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllRubros,
    addRubro,
    getRubroById,
    editRubro,
    deleteRubro,
};
