const express = require('express');
const path = require('path');

module.exports = (app) => {
  // Middleware para servir archivos estáticos
  app.use(express.static(path.join(__dirname, '../public')));

  // Ruta para servir index.html
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });
};
