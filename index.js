// ==========================
// Environment Setup
// ==========================
require("dotenv").config(); // Load environment variables from .env file

// ==========================
// Module Imports /
// ==========================
const express = require("express"); // Import Express framework
const mongoose = require("mongoose"); // Import Mongoose for MongoDB interaction
const contractRoute = require("./routes/contracts/contracts.route"); // Import contract routes

// ==========================
// Configuration
// ==========================
const PORT = process.env.PORT || 3001; // Set the port for the server, defaulting to 3001 if not specified
const MONGOOSE_CONNECT_URI = process.env.MONGOOSE_CONNECT_URI; // MongoDB connection URI

// ==========================
// Express Application Initialization
// ==========================
const app = express(); // Initialize the Express application

// ==========================
// Middleware Setup
// ==========================
app.use(express.json()); // Middleware to parse JSON request bodies

// ==========================
// Route Definitions
// ==========================
app.use("/api/contracts", contractRoute); // Define routes for contract-related API endpoints

// ==========================
// Database Connection
// ==========================
mongoose
    .connect(MONGOOSE_CONNECT_URI) // Connect to MongoDB
    .then(() => {
        console.log("Database connected successfully."); // Log successful connection
    })
    .catch((error) => {
        console.error("Database connection error:", error); // Log connection errors
    });

// ==========================
// Server Initialization
// ==========================
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`); // Log server start
});
