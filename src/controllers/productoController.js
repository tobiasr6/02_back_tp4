const pool = require('../config/db'); // Importar el pool de conexiones

// Obtener todos los productos con la descripción del rubro
const getAllProductos = async (req, res) => {
    try {
        // Hacer un JOIN entre Producto y Rubro para obtener la descripción correcta del rubro
        const [results] = await pool.query(`
            SELECT p.*, r.DescripcionRub AS DescripcionRub 
            FROM Producto p 
            INNER JOIN Rubro r ON p.Rubro = r.idRubroCod
        `);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Crear un nuevo producto
const addProducto = async (req, res) => {
    const { Descripcion, Rubro, Precio, URLImagen } = req.body;
    try {
        // Verificar que el rubro exista
        const [rubroExists] = await pool.query('SELECT * FROM Rubro WHERE idRubroCod = ?', [Rubro]);
        if (rubroExists.length === 0) {
            return res.status(400).json({ message: 'El Rubro especificado no existe' });
        }

        // Intentar insertar el producto
        const [results] = await pool.query('INSERT INTO Producto (Descripcion, Rubro, Precio, URLImagen) VALUES (?, ?, ?, ?)', [Descripcion, Rubro, Precio, URLImagen]);
        res.status(201).json({ id: results.insertId, Descripcion, Rubro, Precio, URLImagen });
    } catch (error) {
        // Manejar errores de duplicados
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Ya existe un producto con este Rubro' });
        }
        res.status(500).json({ error: error.message });
    }
};


// Obtener un producto por ID
const getProductoById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await pool.query('SELECT * FROM Producto WHERE idCodigo = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un producto
const editProducto = async (req, res) => {
    const { id } = req.params;
    const { Descripcion, Rubro, Precio, URLImagen } = req.body; // Asegúrate de que estos sean los campos correctos
    try {
        // Verificar que el rubro exista
        const [rubroExists] = await pool.query('SELECT * FROM Rubro WHERE idRubroCod = ?', [Rubro]);
        if (rubroExists.length === 0) {
            return res.status(400).json({ message: 'El Rubro especificado no existe' });
        }

        const [results] = await pool.query('UPDATE Producto SET Descripcion = ?, Rubro = ?, Precio = ?, URLImagen = ? WHERE idCodigo = ?', [Descripcion, Rubro, Precio, URLImagen, id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ idCodigo: id, Descripcion, Rubro, Precio, URLImagen });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Eliminar un producto
const deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Producto WHERE idCodigo = ?', [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProductos,
    addProducto,
    getProductoById,
    editProducto,
    deleteProducto,
};
