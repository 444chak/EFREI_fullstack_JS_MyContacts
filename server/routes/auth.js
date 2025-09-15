// Auth routes

const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth");
const { runValidators, requireBodyFields, validateEmailField } = require("../middlewares/validation");


router.post(
    "/register",
    runValidators([
        requireBodyFields(["email", "password"]),
        validateEmailField("email"),
    ]),
    AuthController.register
);

router.post(
    "/login",
    runValidators([
        requireBodyFields(["email", "password"]),
        validateEmailField("email"),
    ]),
    AuthController.login
);


module.exports = router;
