const { ethers } = require("hardhat");

async function main() {
  const vestingAddress = "0x4D4734E263654F0a2349438582027b17AFc9715a"; // Update if needed
  const vesting = await ethers.getContractAt("LinearVesting", vestingAddress);

  const amount = await vesting.releasableAmount();
  const grits = amount.toString();
  const gall = ethers.formatUnits(grits, 18);

  console.log(`🧮 Releasable: ${gall} GLL (${grits} grits)`);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});
