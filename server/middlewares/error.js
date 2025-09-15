//Errors handlers 
const errorHandler = (err, req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal server error";
    const details = err.details || undefined;

    const payload = { message };
    if (details) payload.details = details;


    res.status(status).json(payload);
};

// 404 handler
const notFoundHandler = (req, res, _next) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
};

module.exports = { errorHandler, notFoundHandler };


