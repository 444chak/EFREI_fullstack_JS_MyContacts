const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        if (e.name === "TokenExpiredError") return res.status(401).json({ message: "Token expired" });
        return res.status(401).json({ message: "Invalid token" });
    }

};

module.exports = verifyAuth;