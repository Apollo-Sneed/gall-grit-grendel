const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const walletAddress = deployer.address;

  // 12.5% of 50B Gall in grits
  const GRITS_PER_GALL = 230_630_400n;
  const totalGall = 6250000000n;
  const totalAmount = totalGall * GRITS_PER_GALL;

  const start = Math.floor(Date.now() / 1000) + 60; // starts in 1 minute
  const duration = 36 * 30 * 24 * 60 * 60; // 36 months in seconds

  const LinearVesting = await ethers.getContractFactory("LinearVesting");
  const vesting = await LinearVesting.deploy(walletAddress, totalAmount, start, duration);
  await vesting.waitForDeployment();

  console.log(`✅ Grit-based LinearVesting deployed at: ${await vesting.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
