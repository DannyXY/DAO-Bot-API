const axios = require("axios");

async function getCollectionStats(req, res) {
  const { url_slug } = req.params;

  const options = {
    method: "GET",
    url: `https://api.opensea.io/api/v1/collection/${url_slug}/stats`,
    headers: { accept: "application/json" },
  };

  axios
    .request(options)
    .then(function(response) {
      res.status(200).json({
        success: true,
        data: {
          collectionFloorPrice: response.data.stats.floor_price,
          _24hSales: response.data.stats.one_day_sales,
          _6hSales: response.data.stats.six_hour_sales,
          _1hSales: response.data.stats.one_hour_sales,
          totalSales: response.data.stats.total_sales,
          totalSupply: response.data.stats.total_supply,
          _1hdifference: response.data.stats.one_hour_difference,
          _6hdifference: response.data.stats.one_hour_difference,
          _1hvolume: response.data.stats.one_hour_volume,
          _6hvolume: response.data.stats.six_hour_volume,
        },
      });
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: error.msg,
      });
    });
}

async function getContractDetails(req, res) {
  const { address } = req.params;
  const options = {
    method: "GET",
    url: `https://api.opensea.io/api/v1/asset_contract/${address}`,
  };

  axios
    .request(options)
    .then(function(response) {
      res.status(200).json({
        success: true,
        data: response.data,
      });
    })
    .catch(function(error) {
      res.status(400).json({
        success: false,
        error
      });
    });
}

async function getOwnerOfNFT(req, res) {
  const { address, nftId } = req.params;
  const options = {
    method: "GET",
    url: `https://api.opensea.io/api/v1/asset/${address}/${nftId}/owners?limit=20&order_by=created_date&order_direction=desc`,
  };

  axios
    .request(options)
    .then(function(response) {
      res.status(200).json({
        success: true,
        data: {
          currentOwner: response.data.owners.owner,
          previousOwner: response.data.previous,
        },
      });
    })
    .catch(function(error) {
      console.error(error);
    });
}

module.exports = {
  getCollectionStats,
  getContractDetails,
  getOwnerOfNFT,
};
