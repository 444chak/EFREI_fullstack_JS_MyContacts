const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();



console.log("starting server...");

// DB

console.log("DB_USER", process.env.DB_USER);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qviyxhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

async function connectDb() {
    try {
        await mongoose.connect(uri, { dbName: process.env.DB_NAME });
        console.log("Connected to MongoDB via Mongoose");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);
    }
}

connectDb();


const app = express();

// server

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    console.log("You can now access the server at http://localhost:3000");
});

// routes

app.get("/", (req, res) => {
    res.send("Hello World");
});

