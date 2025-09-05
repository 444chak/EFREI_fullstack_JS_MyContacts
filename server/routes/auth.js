// ROUTES D'AUTHENTIFICATION

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {


    const { name, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ name, password: passwordHash });
    user.save();
    res.status(201).json(user);
});


module.exports = router;
