const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jewelryRoutes = require('./src/routes/jewelryRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use morgan middleware to log HTTP requests
app.use(morgan('combined'));

// Use your routes
app.use('/api/jewelry', jewelryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
