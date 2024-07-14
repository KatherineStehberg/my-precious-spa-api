const filtrosModel = require('../models/filtrosModel');

const getJoyasFiltradas = async (req, res, next) => {
    const { precio_min, precio_max, categoria, metal } = req.query;
    try {
        const joyas = await filtrosModel.getJoyasFiltradas({ precio_min, precio_max, categoria, metal });
        res.json(joyas);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getJoyasFiltradas,
};
