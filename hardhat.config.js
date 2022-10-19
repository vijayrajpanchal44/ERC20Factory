require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("hardhat-gas-reporter");
require("solidity-coverage");

module.exports = {
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`${process.env.GOERLI_PRIVATE_KEY}`],
    }
  },

  // gasReporter: {
  //   currency: 'CHF',
  //   gasPrice: 21
  // },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  
  solidity: {
    compilers: [
      {
        version: "0.8.5",
      },
    ],
  }
}