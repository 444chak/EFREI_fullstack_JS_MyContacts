require("dotenv").config();

const mongoose = require("mongoose");

// ============== Database config ==============

const DB_CONFIG = {
    COLLECTIONS: {
        USERS: 'users',
        CONTACTS: 'contacts',
    }
};


// ============== Connect to MongoDB ==============

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qviyxhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectDb = async () => {
    try {
        await mongoose.connect(uri, { dbName: process.env.DB_NAME || "mycontacts" });
        console.log("Connected to MongoDB via Mongoose");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);
    }
}

module.exports = { DB_CONFIG, connectDb };
