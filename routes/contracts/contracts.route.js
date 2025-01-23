// ==========================
// Module Imports
// ==========================
const express = require("express"); // Import Express framework
const {
  getAllContracts,
  getContractById,
  addContract,
  updateContractByAddress,
  deleteContract,
  getContractByContractAddress,
} = require("../../controller/contracts/contracts.controller"); // Import contract controller functions

// ==========================
// Router Initialization
// ==========================
const contractRoute = express.Router(); // Create a new router instance for contract routes

// ==========================
// Route Definitions
// ==========================
contractRoute.get("/", getAllContracts); // GET all contracts
contractRoute.get("/:id", getContractById); // GET a contract by ID
contractRoute.get("/address/:contractAddress", getContractByContractAddress); // GET a contract by contract address
contractRoute.post("/", addContract); // POST a new contract
contractRoute.patch("/address/:contractAddress", updateContractByAddress); // PATCH (update) a contract by contract address
contractRoute.delete("/address/:contractAddress", deleteContract); // DELETE a contract by contract address


// ==========================
// Export Router
// ==========================
module.exports = contractRoute; // Export the router for use in the main application
