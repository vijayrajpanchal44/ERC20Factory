const { expect } = require("chai");
const { ethers, hre } = require("hardhat");
require("@nomiclabs/hardhat-waffle");

async function testfunc(){
    let tokenAddress;
    let factoryAddress
        const TokenFactory = await ethers.getContractFactory("tokenFactory");
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        factoryAddress = await TokenFactory.deploy();
        tokenAddress = await ERC20Token.deploy();
        const tokenAddr = await tokenAddress.address;
   

        await tokenAddress.initialize("My token", "Token", "3");
        const cloneTokenAddress = await factoryAddress.create("clonned token", "CT", "5", tokenAddress.address);
        const box = await tokenAddress.attach(await cloneTokenAddress.address);
        console.log(await cloneTokenAddress.address);
        console.log(tokenAddress.address);
        expect(await box.name()).to.equal("clonned token");
}
testfunc();