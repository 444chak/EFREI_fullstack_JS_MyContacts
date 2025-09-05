const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    /**
     * Register a new user
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     * @returns {Object} - The response object
     */
    static async register(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return res.status(400).json({ message: "Invalid email" });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const user = new User({ email, password: passwordHash });
            await user.save();

            res.status(201).json({ message: "User created successfully", user: { id: user._id, email: user.email } });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    /**
     * Login a user
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     * @returns {Object} - The response object
     */
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

            res.status(200).json({
                message: "Login successful",
                token,
                user: { id: user._id, email: user.email }
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}

module.exports = AuthController;