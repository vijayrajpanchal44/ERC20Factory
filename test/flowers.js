const {expect} = require("chai");
const { ethers, hre } = require("hardhat");
require("@nomiclabs/hardhat-waffle");


describe("Quote", async function(){

    beforeEach(async() => {        
        const SetQuoteMeta = await hre.ethers.getContractFactory("QuoteMeta");
        const setQuoteMeta = await SetQuoteMeta.deploy();

        await setQuoteMeta.deployed();
    })

    it("Should return 1 petal initially when NFT minted", async function () {
        await contractAddress.mintFlowerNFT();

        expect(await contractAddress.balanceOfPetals(contractOwner, 1)).to.equal(1);
    });

})