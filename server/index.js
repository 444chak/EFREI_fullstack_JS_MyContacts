const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
require("dotenv").config();



console.log("starting server...");

// DB

console.log("DB_USER", process.env.DB_USER);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qviyxhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

async function connectDb() {
    try {
        await mongoose.connect(uri, { dbName: process.env.DB_NAME || "mycontacts" });
        console.log("Connected to MongoDB via Mongoose");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);
    }
}

connectDb();


const app = express();

// server

// body parsers
app.use(express.json()); // pour post en json
app.use(express.urlencoded({ extended: true })); // pour post en form-urlencoded

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    console.log("You can now access the server at http://localhost:3000");
});

// routes

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/auth", authRoutes); // routes d'authent

