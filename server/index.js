require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");

const port = process.env.API_PORT || 3000;

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

// swagger

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MyContacts API',
            version: '1.0.0',
            description: 'API documentation for MyContacts - Contact Management System',
            contact: {
                name: 'API Support',
                email: 'support@mycontacts.com'
            }
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Development server'
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ["./docs/*.yaml"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);



// server

const app = express();


// body parsers
app.use(express.json()); // pour post en json
app.use(express.urlencoded({ extended: true })); // pour post en form-urlencoded

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`You can now access the server at http://localhost:${port}`);
});

// routes

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // swagger route

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/auth", authRoutes); // routes d'authent

