var express = require("express");
const {
  getCollectionStats,
  getContractDetails,
  getOwnerOfNFT,
} = require("../controllers/opensea.controller");
var router = express.Router();

/* GET collection listing. */
router.get("/collection/:url_slug", getCollectionStats);
router.get("/contract/:address", getContractDetails);
router.get("/collection/:address/:nftId", getOwnerOfNFT);

module.exports = router;
