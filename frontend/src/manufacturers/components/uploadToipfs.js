import Web3 from "web3"
const ipfsClient = require("ipfs-http-client")

const ipfs = ipfsClient({ host: "ipfs.infura.io", port: 5001, protocol: "https" })
export const uploadToIPFS = async (file) => {
    const result = await ipfs.add(file)
    return result.cid.toString()
}

export const getFromIPFS = async (hash) => {
    const result = await ipfs.get(hash)
    return result[0].content.toString("utf-8")
}

const web3 = new Web3("Your_Blockchain_Provider_Url")
const contractABI = ["235"] // Your smart contract ABI

const contractAddress = "Your_Smart_Contract_Address"
const myContract = new web3.eth.Contract(contractABI, contractAddress)

export const addToBlockchain = async (ipfsHash) => {
    const accounts = await web3.eth.getAccounts()
    await myContract.methods.addToStorage(ipfsHash).send({ from: accounts[0] })
}

export const getFromBlockchain = async () => {
    const result = await myContract.methods.getData().call()
    return result
}

var userInput = prompt("Please enter something:")

// Check if the user provided input
if (userInput !== null) {
    // User provided input, do something with it
    console.log("You entered: " + userInput)
} else {
    // User clicked Cancel or closed the prompt dialog
    console.log("No input provided.")
}
