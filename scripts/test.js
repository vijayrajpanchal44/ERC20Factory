//const { inputToConfig } = require('@ethereum-waffle/compiler');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Token contract', () => {
    let Token, token, owner, addr1, addr2;

    beforeEach(async () => {
        Token = await ethers.getContractFactory('ERC20');
        token = await Token.deploy("Rahul", "RHL");
        [owner, addr1, addr2, _] = await ethers.getSigners();
    });

    describe('Transactions', () => {
        it('Should transfer tokens between accounts', async () => {
            await token.mint(1000);
            await token.transfer(addr1.address, 50);
            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(50);

            await token.connect(addr1).transfer(addr2.address, 50);
            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        });

        it('Should transfer tokens between accounts using transfer from', async () => {
            await token.mint(1000);
            await token.approve(addr1.address, 1000);
            await token.connect(addr1).transferFrom(owner.address, addr2.address, 50);
            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
            const ownerBalance = await token.balanceOf(owner.address);
            expect(ownerBalance).to.equal(950);
            expect((await token.allowance(owner.address, addr1.address)).toNumber()).to.equal(1000);
        });

        it('Should increase or decrease allowance', async () => {
            await token.mint(1000);
            await token.approve(addr1.address, 1000);

            await token.increaseAllowance(addr1.address, 500);
            expect((await token.allowance(owner.address, addr1.address))).to.equal(1500);;

            await token.decreaseAllowance(addr1.address, 200);
            expect((await token.allowance(owner.address, addr1.address))).to.equal(1300);
        });

        it('Should  the total supply of tokens equal to the owner', async () => {
            const ownerBalance = await token.balanceOf(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance);
        });

        it('Should fail if the sender doesnt have enough tokens', async () => {
            const initialOwnerBalance = await token.balanceOf(owner.address);
            await expect(token.connect(addr1).transfer(owner.address, 10)).to.be.revertedWith("ERC20: transfer amount exceeds balance");
            expect((await token.balanceOf(owner.address)).toNumber()).to.equal(initialOwnerBalance.toNumber());//toNumber() is done to convert it into a string as BigNumber value was getting returned...
        });

        it('Should update balances after transfers', async () => {
            await token.mint(1000);
            const initialOwnerBalance = await token.balanceOf(owner.address);
            await token.transfer(addr1.address, 100);
            await token.transfer(addr2.address, 50);

            expect((await token.balanceOf(owner.address)).toNumber()).to.equal(initialOwnerBalance - 150);

            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance.toNumber()).to.equal(100);

            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance.toNumber()).to.equal(50);
        });
    });
});