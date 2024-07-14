const joyasModel = require('../models/joyasModel');

const getJoyas = async (req, res, next) => {
    const { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;
    try {
        const joyas = await joyasModel.getJoyas({ limits, page, order_by });
        res.json(joyas);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getJoyas,
};
