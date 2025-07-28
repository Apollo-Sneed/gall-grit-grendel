// === test/GrendelRounding.test.js ===

const { expect: expect2 } = require("chai");
const { ethers: ethers2 } = require("hardhat");

describe("Grendel Token Rounding", function () {
  let Grendel, grendel, owner, addr1;
  const MIN_UNIT = ethers2.BigNumber.from("20000000");

  beforeEach(async function () {
    [owner, addr1] = await ethers2.getSigners();
    Grendel = await ethers2.getContractFactory("Grendel");
    grendel = await Grendel.deploy();
    await grendel.deployed();
  });

  const roundingCases = [
    { input: "1.5", expectRounded: true },
    { input: "2.777", expectRounded: true },
    { input: "3", expectRounded: true },
    { input: "0.999999999", expectRounded: true },
    { input: "0.000000001", expectRounded: false }
  ];

  roundingCases.forEach(({ input, expectRounded }) => {
    const inputBN = ethers2.utils.parseUnits(input, 18);
    const expectedUnits = inputBN.div(MIN_UNIT);
    const expectedRounded = expectedUnits.mul(MIN_UNIT);

    if (expectedRounded.gt(0)) {
      it(`should round down Grendel input ${input} to nearest grit`, async function () {
        await expect2(grendel.transfer(addr1.address, inputBN))
          .to.emit(grendel, "TransferRounded")
          .withArgs(owner.address, addr1.address, inputBN, expectedRounded);

        const actual = await grendel.balanceOf(addr1.address);
        expect2(actual).to.equal(expectedRounded);
      });
    } else {
      it(`should reject Grendel input ${input} below one grit`, async function () {
        await expect2(grendel.transfer(addr1.address, inputBN)).to.be.revertedWith(
          "Amount must be at least one Grendel-Grit"
        );
      });
    }
  });

  it("should reject transfers below min unit", async function () {
    const tooSmall = MIN_UNIT.sub(1);
    await expect2(grendel.transfer(addr1.address, tooSmall)).to.be.revertedWith(
      "Amount must be at least one Grendel-Grit"
    );
  });
});
