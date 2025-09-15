const Contact = require("../models/contact");
const jwt = require('jsonwebtoken');

class ContactController {

    /**
     * Create a new contact with JWT verification
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     * @returns {Object} - The response object
     */
    static async createContact(req, res, next) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            if (!token) {
                return res.status(401).json({ message: "No token provided" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const contactOf = decoded.userId;
            const { firstName, lastName, phone } = req.body;

            if (!firstName || !lastName || !phone) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const contact = new Contact({ firstName, lastName, phone, contactOf });
            await contact.save();
            res.status(201).json(contact);
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                error.status = 401;
                error.message = "Invalid token";
            }
            next(error);
        }
    }

    /**
     * Get all contacts with JWT verification
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     * @returns {Object} - The response object
     */
    static async getContacts(req, res, next) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            if (!token) {
                return res.status(401).json({ message: "No token provided" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const contactOf = decoded.userId;
            const contacts = await Contact.find({ contactOf });
            res.status(200).json(contacts);
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                error.status = 401;
                error.message = "Invalid token";
            }
            next(error);
        }
    }

    /**
     * Update a contact by id with JWT verification
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     * @returns {Object} - The response object
     */
    static async updateContact(req, res, next) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            if (!token) {
                return res.status(401).json({ message: "No token provided" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const contactOf = decoded.userId;
            const { id } = req.params;

            const contact = await Contact.findOneAndUpdate(
                { _id: id, contactOf: contactOf },
                req.body,
                { new: true }
            );

            if (!contact) {
                return res.status(404).json({ message: "Contact not found or not authorized" });
            }

            res.status(200).json(contact);
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                error.status = 401;
                error.message = "Invalid token";
            }
            next(error);
        }
    }

    /**
     * Delete a contact by id with JWT verification
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     * @returns {Object} - The response object
     */
    static async deleteContact(req, res, next) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            if (!token) {
                return res.status(401).json({ message: "No token provided" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const contactOf = decoded.userId;
            const { id } = req.params;

            const contact = await Contact.findOneAndDelete({ _id: id, contactOf: contactOf });

            if (!contact) {
                return res.status(404).json({ message: "Contact not found or not authorized" });
            }

            res.status(200).json({ message: "Contact deleted successfully" });
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                error.status = 401;
                error.message = "Invalid token";
            }
            next(error);
        }
    }
}

module.exports = ContactController;