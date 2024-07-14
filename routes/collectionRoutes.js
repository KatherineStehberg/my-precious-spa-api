const express = require('express');
const router = express.Router();
const path = require('path');

// Define the route for the collection page
router.get('/collection', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'collection.html'));
});

module.exports = router;
