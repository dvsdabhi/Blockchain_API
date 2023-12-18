const express = require("express");
const router = express.Router();
const { Transfer, Name, Token_Symbol, Token_decimals, TotalSupply, Balance_Of, TransferFrom } = require("../controllers/Api");

router.route('/name').get(Name);
router.route('/symbol').get(Token_Symbol);
router.route('/decimals').get(Token_decimals);
router.route('/totalsupply').get(TotalSupply);
router.route('/balance').post(Balance_Of);
router.route('/transfer').post(Transfer);
router.route('/transferform').post(TransferFrom);


module.exports = router;