var express = require("express");
const {
  getCurrentGas,
  getEstimatedTxTime,
  getEtherBalance
} = require("../controllers/etherscan.controller");

var router = express.Router();

router.get("/gasPrice", getCurrentGas);
router.get("/txnTime/:gasGwei", getEstimatedTxTime);
router.get("/balance/:address", getEtherBalance)

module.exports = router;
