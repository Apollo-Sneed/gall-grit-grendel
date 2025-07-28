const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const token = "0x0000000000000000000000000000000000000000"; // Placeholder for now
  const beneficiary = "0x48E8189279f03c826745Bfe9f62879B240F297DB"; // Replace this

  const totalAmount = ethers.parseUnits("6250000000", 0) * 230630400n;
  const start = Math.floor(Date.now() / 1000) + 60; // Vesting starts in 60 seconds
  const duration = 36 * 30 * 24 * 60 * 60; // ~36 months in seconds

  const LinearVesting = await ethers.getContractFactory("LinearVesting");
  const vesting = await LinearVesting.deploy(token, beneficiary, totalAmount, start, duration);
  await vesting.deployed();

  console.log(`✅ LinearVesting deployed at: ${vesting.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
