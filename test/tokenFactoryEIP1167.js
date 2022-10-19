const { expect } = require("chai");
const { ethers, hre } = require("hardhat");
require("@nomiclabs/hardhat-waffle");

describe("EIP1167 test factory", async function () {
    let tokenContract;
    let factoryContract;
    let cloneTokenContract;
    let txRecipt;
    let tokenAddress;

    beforeEach(async () => {
        const TokenFactory = await ethers.getContractFactory("tokenFactory");
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        factoryContract = await TokenFactory.deploy();
        tokenContract = await ERC20Token.deploy();

        await tokenContract.initialize("My token", "Token", "3");
         tokenAddress = await tokenContract.address;
        cloneTokenContract = await factoryContract.create("clonned token", "CT", "5", tokenAddress);

        // wait until the transaction is mined
         txRecipt = await cloneTokenContract.wait();
    })

    it("Should clone ERC20 token from template token", async function () {
        let newTokenAddress;
        for (const event of txRecipt.events) {
            newTokenAddress = event.args.newToken;
        }
        const MyContract = await ethers.getContractFactory("ERC20Token");
        const contract = await MyContract.attach(
            newTokenAddress // The deployed contract address
        );

        expect(await contract.name()).to.equal("clonned token");
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

