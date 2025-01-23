// ==========================
// Model Import
// ==========================
const ContractModel = require("../../model/contracts/contracts.model"); // Import the Contract model

// ==========================
// Controller Functions
// ==========================

// Get all contracts
const getAllContracts = async (req, res) => {
  try {
    const contracts = await ContractModel.find({}); // Fetch all contracts from the database
    console.log(contracts); // Log the retrieved contracts
    res.status(200).json(contracts); // Respond with the contracts and a 200 status
  } catch (error) {
    res.status(500).json({
      message: error.message,
    }); // Handle errors and respond with a 500 status
  }
};

// Get a contract by ID
const getContractById = async (req, res) => {
  try {
    const { id } = req.params; // Extract the contract ID from request parameters
    const contract = await ContractModel.findById(id); // Fetch the contract by ID
    if (!contract) {
      return res.status(404).json({
        message: "Contract not found",
      }); // Handle case where contract is not found
    }
    console.log(contract); // Log the retrieved contract
    res.status(200).json(contract); // Respond with the contract and a 200 status
  } catch (error) {
    res.status(500).json({
      message: error.message,
    }); // Handle errors and respond with a 500 status
  }
};

// Get a contract by contract address
const getContractByContractAddress = async (req, res) => {
  try {
    const { contractAddress } = req.params; // Extract the contract address from request parameters
    // Validate contract address format (optional)
    if (!contractAddress || typeof contractAddress !== "string" || contractAddress.trim() === "") {
      return res.status(400).json({ message: "Invalid contract address format" });
    }
    // Fetch the contract by contract address
    const contract = await ContractModel.findOne({ contractAddress });
    if (!contract) {
      return res.status(404).json({
        message: "Contract not found",
      }); // Handle case where contract is not found
    }
    // Parse ABI string back into an array
    const parsedContract = {
      ...contract.toObject(), // Convert Mongoose document to plain object
      abi: JSON.parse(contract.abi), // Parse ABI string into an array
    };
    console.log(parsedContract); // Log the retrieved contract
    res.status(200).json(parsedContract); // Respond with the contract and a 200 status
  } catch (error) {
    console.error("Error fetching contract by address:", error); // Log the error for debugging
    res.status(500).json({
      message: error.message,
    }); // Handle errors and respond with a 500 status
  }
};

// Add a new contract
const addContract = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { contractAddress, contractName, abi, bin } = req.body;
    
    // Validate required fields
    if (!contractAddress || !contractName || !abi || !bin) {
      return res.status(400).json({
        message: "All fields (contractAddress, contractName, abi, bin) are required.",
      });
    }

    // Create a new contract using request body
    const contractDetails = {
      contractAddress,
      contractName,
      abi: JSON.stringify(abi), // Store ABI as a string
      bin,
    };
    
    const contract = await ContractModel.create(contractDetails); // Create the contract in the database
    console.log(contract); // Log the created contract
    
    res.status(201).json(contract); // Respond with the created contract and a 201 status
  } catch (error) {
    console.error("Error adding contract:", error); // Log the error for debugging
    res.status(500).json({
      message: error.message,
    }); // Handle errors and respond with a 500 status
  }
};

// Edit an existing contract by address
const updateContractByAddress = async (req, res) => {
  try {
    const { contractAddress } = req.params; // Extract contract address from request parameters

    // Validate address format (optional)
    if (!contractAddress || typeof contractAddress !== "string" || contractAddress.trim() === "") {
      return res.status(400).json({ message: "Invalid contract address format" });
    }

    // Fetch the contract by address
    const contract = await ContractModel.findOne({ contractAddress });
    
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }
    
    // Update the contract with the data provided in the request body
    Object.assign(contract, req.body); // Update only fields provided in req.body
    
    await contract.save(); // Save changes
    
    console.log(contract); // Log the updated contract
    
    res.status(200).json(contract); // Respond with updated contract data
  } catch (error) {
    console.error("Error updating contract by address:", error);
    
    res.status(500).json({ message: error.message });
  }
};

// Delete a contract by address
const deleteContract = async (req, res) => {
  try {
    const { contractAddress } = req.params; // Extract the contract address from request parameters
    
    const contract = await ContractModel.findOneAndDelete({ contractAddress }); // Delete the contract by address
    
    if (!contract) {
      return res.status(404).json({
        message: "Contract not found",
      }); // Handle case where contract is not found
    }
    
    res.status(200).json({
      message: "Contract deleted",
    }); // Respond with a success message and a 200 status
  } catch (error) {
    console.error("Error deleting contract:", error);
    
    res.status(500).json({
      message: error.message,
    }); // Handle errors and respond with a 500 status
  }
};

// ==========================
// Export Controller Functions
// ==========================
module.exports = {
  getAllContracts,
  getContractById,
  getContractByContractAddress,
  addContract,
  updateContractByAddress,
  deleteContract,
};
