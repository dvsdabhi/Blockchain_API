require("dotenv").config();
const { log } = require("console");
const ABI = require("../Abi.json");
const ethers = require("ethers");


const private = process.env.Private_key;


const Contract_address = "0xC71DC472B25B7b2E446F829793F54BaA204e14E4";
const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/L0xh-QenUG7vPiZ9aWet66kUU5SMNl_-");
const wallet = new ethers.Wallet(private, provider);
const contract = new ethers.Contract(Contract_address, ABI, wallet);
    

const Name = async (req,res) => {
    const Token_name = await contract.name();
    res.send(Token_name);
}

const Token_Symbol = async(req,res) => {
    const sym = await contract.symbol();
    res.send({"symbol":sym});
}

const Token_decimals = async(req,res) => {
    const decimals = await contract.decimals();
    const de = decimals.toString();
    res.send({"decimal":de});
}

const TotalSupply = async(req,res) => {
    const total = await contract.totalSupply();
    const to = total.toString();
    res.send({"total_supply":to});
}

const Balance_Of = async (req,res) => {
    try {
        let ob1 = req.body;
        console.log(ob1.address);
        const bal = await contract.balanceOf(ob1.address);
        const bal_Of = bal.toString();
        res.send({"Account_bal":bal_Of});
        }
    catch(error){
        console.log(error);
    }
}
    
const Transfer = async (req, res) => {
    try {
        const { to, amount } = req.body;
        await contract.transfer(to, amount);
        res.send("successfully");
    }
    catch(error){
        console.log(error);
    }
};

const TransferFrom = async (req,res) => {
    try{
        const { from_add, to_add, amount } = req.body();
        await contract.transferFrom(from_add,to_add,amount);
        res.send("token transfer successfully");
    }catch(error){
        console.log(error);
    }
}

module.exports = { Transfer, Name, Token_Symbol, Token_decimals, TotalSupply, Balance_Of, TransferFrom };