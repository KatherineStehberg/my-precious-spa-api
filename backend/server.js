const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Simulated database
let joyas = [
    { id: 1, nombre: 'Anillo de oro', categoria: 'anillos', metal: 'oro', precio: 100, stock: 10 },
    { id: 2, nombre: 'Collar de plata', categoria: 'collares', metal: 'plata', precio: 50, stock: 5 },
    // Add more jewelry as needed
];

// API routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route to filter jewelry with query parameters
app.get('/joyas', (req, res) => {
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

// Route for additional filtering
app.get('/joyas/filtros', (req, res) => {
  const { precio_min, precio_max, categoria, metal } = req.query;

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

  res.json(filteredJoyas);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
