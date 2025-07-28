const { ethers } = require("hardhat");

async function main() {
  const vestingAddress = "0x7C4EE1AE7cd59fEE22B81Ea16D7E6A088278D89D"; // Update with your actual deployed vesting address

  const vesting = await ethers.getContractAt("LinearVestingDev", vestingAddress);

  const tx = await vesting.release();
  await tx.wait();

  console.log("✅ Tokens released from vesting contract.");
}

main().catch((err) => {
  console.error("❌ Release failed:", err);
  process.exitCode = 1;
});
