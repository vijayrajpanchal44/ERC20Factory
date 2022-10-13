require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
// require('dotenv').config({ path: __dirname + '/.env' })

module.exports = {
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`${process.env.GOERLI_PRIVATE_KEY}`],
    }
  },

  etherscan: {
    apiKey: "7KBWHWMD92WMP1C2XKY1AJ12Z9KDYUNK4D",
  },
  
  solidity: {
    compilers: [
      {
        version: "0.8.5",
        // settings: {
        //   optimizer: {
        //     enabled: true,
        //     runs: 200,
        //   },
        // },
      },
    ],
  }
}