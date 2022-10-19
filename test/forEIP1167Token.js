const { expect } = require("chai");
const { ethers, hre } = require("hardhat");
require("@nomiclabs/hardhat-waffle");

describe("eth-gas-reporter workaround", () => {
    it("should kill time", (done) => {
        setTimeout(done, 2000);
    });
});
describe("for ERC1167 ERC20 token test", async function () {
    let tokenContract;

    beforeEach(async () => {
        const ERC20Token = await ethers.getContractFactory("ERC20Token");

        tokenContract = await ERC20Token.deploy();
        
        await tokenContract.initialize("My Token", "MTK", 18);
        [owner, addr1, addr2, _] = await ethers.getSigners();

    })

    it('has a name', async function () {
        expect(await tokenContract.name()).to.equal("My Token");
    });

    it('has a symbol', async function () {
        expect(await tokenContract.symbol()).to.equal("MTK");
    });

    it('has decimals', async function () {
        expect(await tokenContract.decimals()).to.equal(18);
    });

    it('can set decimals during initialization', async function () {
        const decimals = 8;
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const tokenContract = await ERC20Token.deploy();

        await tokenContract.initialize("My Token", "MTK", decimals)
        expect(await tokenContract.decimals()).to.be.equal(decimals);
    });

    it('Should transfer tokens between accounts', async () => {
        await tokenContract.mint(1000);
        await tokenContract.transfer(addr1.address, 50);
        const addr1Balance = await tokenContract.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(50);

        await tokenContract.connect(addr1).transfer(addr2.address, 50);
        const addr2Balance = await tokenContract.balanceOf(addr2.address);
        expect(addr2Balance).to.equal(50);
    });

    it('Should transfer tokens between accounts using transfer from', async () => {
        await tokenContract.mint(1000);
        await tokenContract.approve(addr1.address, 1000);
        await tokenContract.connect(addr1).transferFrom(owner.address, addr2.address, 50);
        const addr2Balance = await tokenContract.balanceOf(addr2.address);
        expect(addr2Balance).to.equal(50);
        const ownerBalance = await tokenContract.balanceOf(owner.address);
        expect(ownerBalance).to.equal(950);
        expect((await tokenContract.allowance(owner.address, addr1.address)).toNumber()).to.equal(950);
    });

    it('Should increase allowance', async () => {
        await tokenContract.mint(1000);
        await tokenContract.approve(addr1.address, 1000);

        await tokenContract.increaseAllowance(addr1.address, 500);
        expect((await tokenContract.allowance(owner.address, addr1.address))).to.equal(1500);;
    });

    it('Should decrease allowance', async () => {
        await tokenContract.mint(1000);
        await tokenContract.approve(addr1.address, 1000);

        await tokenContract.decreaseAllowance(addr1.address, 200);
        expect((await tokenContract.allowance(owner.address, addr1.address))).to.equal(800);
    });

    it('Should  the total supply of tokens equal to the owner', async () => {
        const ownerBalance = await tokenContract.balanceOf(owner.address);
        expect(await tokenContract.totalSupply()).to.equal(ownerBalance);
    });

    it('Should fail if the sender doesnt have enough tokens', async () => {
        const initialOwnerBalance = await tokenContract.balanceOf(owner.address);
        await expect(tokenContract.connect(addr1).transfer(owner.address, 10)).to.be.revertedWith("ERC20: transfer amount exceeds balance");
        expect((await tokenContract.balanceOf(owner.address)).toNumber()).to.equal(initialOwnerBalance.toNumber());//toNumber() is done to convert it into a string as BigNumber value was getting returned...
    });

    it('Should update balances after transfers', async () => {
        await tokenContract.mint(1000);
        const initialOwnerBalance = await tokenContract.balanceOf(owner.address);
        await tokenContract.transfer(addr1.address, 100);
        await tokenContract.transfer(addr2.address, 50);

        expect((await tokenContract.balanceOf(owner.address)).toNumber()).to.equal(initialOwnerBalance - 150);

        const addr1Balance = await tokenContract.balanceOf(addr1.address);
        expect(addr1Balance.toNumber()).to.equal(100);

        const addr2Balance = await tokenContract.balanceOf(addr2.address);
        expect(addr2Balance.toNumber()).to.equal(50);
    });

})

