const pool = require('../config/database');

const getJoyasFiltradas = async ({ precio_min, precio_max, categoria, metal }) => {
    const filters = [];
    const values = [];

    if (precio_min) {
        filters.push(`precio >= $${values.length + 1}`);
        values.push(precio_min);
    }

    if (precio_max) {
        filters.push(`precio <= $${values.length + 1}`);
        values.push(precio_max);
    }

    if (categoria) {
        filters.push(`categoria = $${values.length + 1}`);
        values.push(categoria);
    }

    if (metal) {
        filters.push(`metal = $${values.length + 1}`);
        values.push(metal);
    }

    let queryText = 'SELECT * FROM inventario';
    if (filters.length > 0) {
        queryText += ' WHERE ' + filters.join(' AND ');
    }

    const result = await pool.query({
        text: queryText,
        values,
    });

    return result.rows;
};

module.exports = {
    getJoyasFiltradas,
};
