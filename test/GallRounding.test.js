// === test/GallRounding.test.js ===

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Gall Token Rounding", function () {
  let Gall, gall, owner, addr1;
  const WEI_PER_GALL_GRIT = ethers.BigNumber.from("4335941836");

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    Gall = await ethers.getContractFactory("Gall");
    gall = await Gall.deploy();
    await gall.deployed();
  });

  const roundingCases = [
    { input: "1.5", expectRounded: true },
    { input: "2.777", expectRounded: true },
    { input: "3", expectRounded: true },
    { input: "0.999999999", expectRounded: true }
  ];

  roundingCases.forEach(({ input }) => {
    it(`should round down Gall input ${input} to nearest grit`, async function () {
      const inputGall = ethers.utils.parseUnits(input, 18);
      const expectedGrits = inputGall.div(WEI_PER_GALL_GRIT);
      const expectedRounded = expectedGrits.mul(WEI_PER_GALL_GRIT);

      await expect(gall.transfer(addr1.address, inputGall))
        .to.emit(gall, "TransferRounded")
        .withArgs(owner.address, addr1.address, inputGall, expectedRounded);

      const actual = await gall.balanceOf(addr1.address);
      expect(actual).to.equal(expectedRounded);
    });
  });

  it("should reject Gall transfers below one grit", async function () {
    const tooSmall = WEI_PER_GALL_GRIT.sub(1);
    await expect(gall.transfer(addr1.address, tooSmall)).to.be.revertedWith(
      "Amount must be at least one Gall-Grit"
    );
  });
});
