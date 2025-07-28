const { ethers } = require("hardhat");

async function main() {
  const vestingAddress = "0x381dC357E7Cb1F7c37652AEAa5D55AC9919AD4D6";
  const LinearVesting = await ethers.getContractAt("LinearVesting", vestingAddress);

  const tx = await LinearVesting.release();
  await tx.wait();
  console.log("✅ Tokens released successfully");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
