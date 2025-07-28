const { ethers } = require("hardhat");

async function main() {
  const vestingAddress = "0x4D4734E263654F0a2349438582027b17AFc9715a";
  const gallAddress = "0x775b0D5528C2EfCDC418F7CB99193704B80A9C18";

  const vesting = await ethers.getContractAt("LinearVesting", vestingAddress);

  console.log("🟡 Sending setToken() transaction...");
  const tx = await vesting.setToken(gallAddress, { gasLimit: 300000 });
  console.log(`⏳ Transaction hash: ${tx.hash}`);

  const receipt = await tx.wait();
  console.log(`✅ Confirmed in block ${receipt.blockNumber}`);
  console.log("🔗 Gall token successfully linked to vesting contract.");
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});
