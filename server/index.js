require("dotenv").config();

const express = require("express");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = require("./config/swagger");
const { connectDb } = require("./config/database");
const corsOptions = require("./config/cors");
const { errorHandler, notFoundHandler } = require("./middlewares/error");

// ============== Define PORT ==============
const port = process.env.API_PORT || 3000;

console.log("starting server...");

// ============== DB init ==============

console.log("connecting to DB...");
connectDb();


// ============== swagger init ==============

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// ============== server init ==============

const app = express();

// ============== CORS configuration ==============
app.use(corsOptions);

// ============== body parsers ==============
app.use(express.json()); // pour post en json
app.use(express.urlencoded({ extended: true })); // pour post en form-urlencoded

// ============== server start ==============

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`You can now access the server at http://localhost:${port}`);
});

// ============== routes ==============

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // swagger route

app.get("/", (_, res) => {
    res.send("Hello World, for swagger <a href='/api-docs'>API Docs</a>");
}); // hello world route

app.use("/auth", authRoutes); // routes d'authent

app.use("/contacts", contactRoutes); // routes pour les contacts
// ============== not found + error handlers ==============
app.use(notFoundHandler);
app.use(errorHandler);
