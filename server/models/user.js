// USER MODEL 
const mongoose = require("mongoose");
const DB_CONFIG = require("../config/database");

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema, DB_CONFIG.COLLECTIONS.USERS);

module.exports = User;
