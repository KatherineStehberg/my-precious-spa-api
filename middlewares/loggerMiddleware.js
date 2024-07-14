const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] Request to ${req.path}`);
    next();
};

module.exports = loggerMiddleware;
