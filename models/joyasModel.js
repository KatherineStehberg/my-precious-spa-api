const pool = require('../config/database');

const getJoyas = async ({ limits, page, order_by }) => {
    const offset = (page - 1) * limits;
    const orderBy = order_by.split('_');
    const query = {
        text: `SELECT * FROM inventario ORDER BY ${orderBy[0]} ${orderBy[1]} LIMIT $1 OFFSET $2`,
        values: [limits, offset],
    };
    const result = await pool.query(query);
    const hateoas = {
        data: result.rows,
        links: {
            self: `/joyas?limits=${limits}&page=${page}&order_by=${order_by}`,
            next: `/joyas?limits=${limits}&page=${parseInt(page) + 1}&order_by=${order_by}`,
            prev: `/joyas?limits=${limits}&page=${parseInt(page) - 1}&order_by=${order_by}`,
        },
    };
    return hateoas;
};

module.exports = {
    getJoyas,
};
