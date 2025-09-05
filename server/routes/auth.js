// ROUTES D'AUTHENTIFICATION

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    // check mail & password
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // check validity of mail
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    // check if mail used
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: passwordHash });
    await user.save();
    res.status(201).json(user);
});


module.exports = router;
