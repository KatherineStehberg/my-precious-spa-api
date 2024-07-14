// src/routes/jewelryRoutes.js

const express = require('express');
const router = express.Router();

// Example database simulation (replace with your actual data handling)
let joyas = [
    { id: 1, nombre: 'Anillo de oro', categoria: 'anillos', metal: 'oro', precio: 100, stock: 10 },
    { id: 2, nombre: 'Collar de plata', categoria: 'collares', metal: 'plata', precio: 50, stock: 5 },
    // Add more jewelry items as needed
];

// Route to get jewelry with filtering, pagination, and sorting
router.get('/', (req, res) => {
    const { page = 1, limit = 10, order_by = 'id_ASC', categoria, metal, precio_min, precio_max } = req.query;

    let filteredJoyas = joyas;

    if (categoria) {
        filteredJoyas = filteredJoyas.filter(joya => joya.categoria === categoria);
    }

    if (metal) {
        filteredJoyas = filteredJoyas.filter(joya => joya.metal === metal);
    }

    if (precio_min) {
        filteredJoyas = filteredJoyas.filter(joya => joya.precio >= Number(precio_min));
    }

    if (precio_max) {
        filteredJoyas = filteredJoyas.filter(joya => joya.precio <= Number(precio_max));
    }

    const [field, order] = order_by.split('_');
    filteredJoyas.sort((a, b) => {
        if (order === 'ASC') {
            return a[field] > b[field] ? 1 : -1;
        } else {
            return a[field] < b[field] ? 1 : -1;
        }
    });

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedJoyas = filteredJoyas.slice(startIndex, endIndex);

    res.json(paginatedJoyas);
});

// Route to create new jewelry item
router.post('/', (req, res) => {
    const newJewelry = req.body;
    // Here you would typically add the new jewelry to your database or data source
    joyas.push(newJewelry); // For example, adding to the local array
    res.status(201).json(newJewelry);
});

module.exports = router;
