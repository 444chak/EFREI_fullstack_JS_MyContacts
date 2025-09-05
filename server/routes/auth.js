// ROUTES D'AUTHENTIFICATION

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthController = require("../controllers/auth");

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);


module.exports = router;
