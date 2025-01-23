// ==========================
// Module Import
// ==========================
const mongoose = require("mongoose"); // Import Mongoose for MongoDB interaction

// ==========================
// Contract Schema Definition
// ==========================
const ContractSchema = mongoose.Schema({
    contractAddress: {
        type: String, // Unique address of the contract on the blockchain
        required: false, // Contract address is required
    },
    contractName: {
        type: String, // Name of the contract
        required: false, // Contract name is required
    },
    abi: {
        type: String, // ABI of the contract (array of JSON objects)
        required: false, // ABI is required
    },
    bin: {
        type: String, // Binary representation of the contract
        required: false, // BIN is required
    },
    createdAt: {
        type: Date, // Date when the contract was created
        default: Date.now, // Default to current date
    },
}, {
    timestamps: true, // Automatically create 'createdAt' and 'updatedAt' fields
});

// ==========================
// Export Contract Model
// ==========================
module.exports = mongoose.model("Contract", ContractSchema); // Export the Contract model based on the schema
