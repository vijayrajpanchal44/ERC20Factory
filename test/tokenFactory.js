const { expect } = require("chai");
const { ethers, hre } = require("hardhat");
require("@nomiclabs/hardhat-waffle");

describe("Test factory", async function () {
    let factoryContract;
    let tokenContract;    
    let newTokenContract;
    let txRecipt;
    let tokenAddress;

    beforeEach(async () => {
        const FactoryContract = await ethers.getContractFactory("ERC20TokenFactory");
        const ERC20Token = await ethers.getContractFactory("Token");
        factoryContract = await FactoryContract.deploy();
        tokenContract = await ERC20Token.deploy("test", "test", 1);

        newTokenContract = await factoryContract.tokenFactory("My token", "Token", 3);
        txRecipt = await newTokenContract.wait();
    })

    it("Should clone ERC20 token from openzepplin erc20", async function () {
        let newTokenAddress;

        for (const event of txRecipt.events) {
            newTokenAddress = event.args.newToken;
        }
    
        const MyContract = await ethers.getContractFactory("Token");
        const contract = await MyContract.attach(
            newTokenAddress // The deployed contract address
        );
  
        expect(await contract.name()).to.equal("My token");
        expect(await contract.symbol()).to.equal("Token");
        expect(await contract.decimals()).to.equal(3);
    });

    it("Should emit TokenCreated event", async function () {
        expect(txRecipt).to.emit(factoryContract, "TokenCreated")
    });

    // it("Should emit TokenCreated event with data", async function () {
    //     await expect(txRecipt)
    //         .to.emit(factoryContract, "TokenCreated")
    //         .withArgs("clonned token", "CT", "5", tokenAddress);
    // });
})


