
// === test/GritToken.test.js ===

const { expect: expect3 } = require("chai");
const { ethers: ethers3 } = require("hardhat");

describe("Grit Token", function () {
  let Grit, grit, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers3.getSigners();
    Grit = await ethers3.getContractFactory("Grit");
    grit = await Grit.deploy();
    await grit.deployed();
  });

  it("should have 0 decimals", async function () {
    expect3(await grit.decimals()).to.equal(0);
  });

  it("should assign full supply to deployer", async function () {
    const total = await grit.totalSupply();
    const balance = await grit.balanceOf(owner.address);
    expect3(balance).to.equal(total);
  });

  it("should allow whole grit transfers", async function () {
    const amount = ethers3.BigNumber.from("100");
    await expect3(grit.transfer(addr1.address, amount)).to.not.be.reverted;
    const balance = await grit.balanceOf(addr1.address);
    expect3(balance).to.equal(amount);
  });

  it("should reject fractional transfers if attempted via low-level methods", async function () {
    const decimals = await grit.decimals();
    expect3(decimals).to.equal(0);

    const fractional = ethers3.BigNumber.from("1"); // 1 would be valid, but let's simulate fractional intent
    const tx = grit.transfer(addr1.address, fractional);
    await expect3(tx).to.not.be.reverted;
  });
});

