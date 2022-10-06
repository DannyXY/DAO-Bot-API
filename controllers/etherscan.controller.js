const ethers = require("ethers")
require("dotenv").config({ path: ".env" });
const fetch = require("node-fetch")

async function getCurrentGas(req, res) {
  try {
    const response = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_API_TOKEN}`)
    const data = await response.json()
    const { SafeGasPrice, ProposedGasPrice, FastGasPrice } = data.result;
    res.status(201).json({
      success: true,
      data: {
        SafeGasPrice,
        ProposedGasPrice,
        FastGasPrice,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.msg,
    });
  }
}

async function getEstimatedTxTime(req, res) {
  const { gasGwei } = req.params;
  const gasWei = gasGwei * 10 ** 9;
  try {
    const response = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=${gasWei}&apikey=${process.env.ETHERSCAN_API_TOKEN} `)
    const data = await response.json()
    const txTime = data.result;
    res.status(201).json({
      success: true,
      data: {
        txTime,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.msg,
    });
  }
}

async function getEtherBalance(req, res) {
  const { address } = req.params

  try {
    const response = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.ETHERSCAN_API_TOKEN} `)
    const data = await response.json()
    const ethBalance = ethers.utils.formatEther(data.result)
    res.status(200).json({
      success: true,
      data: ethBalance
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.msg,
    });
  }
}



module.exports = {
  getCurrentGas,
  getEstimatedTxTime,
  getEtherBalance
};
