const express = require('express');
const router = express.Router();
const filtrosController = require('../controllers/filtrosController');

router.get('/', filtrosController.getJoyasFiltradas);

module.exports = router;
