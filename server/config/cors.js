const cors = require("cors");

const corsOptions = cors({
    origin: ['http://localhost:3000', 'http://localhost:5555'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
});

module.exports = corsOptions;