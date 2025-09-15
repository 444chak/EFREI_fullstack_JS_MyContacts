// CONTACT MODEL

const mongoose = require("mongoose");
const { DB_CONFIG } = require("../config/database");

const contactSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phone: { type: String, required: true },
        contactOf: { type: mongoose.Schema.Types.ObjectId, ref: DB_CONFIG.COLLECTIONS.USERS, required: true },
    },
    { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema, DB_CONFIG.COLLECTIONS.CONTACTS);

module.exports = Contact;