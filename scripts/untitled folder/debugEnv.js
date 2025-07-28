const { ethers } = require("hardhat");

async function main() {
  const signer = await ethers.getSigner();
  const address = await signer.getAddress();
  const nonce = await ethers.provider.getTransactionCount(address);

  console.log("✅ RPC URL (partial):", process.env.SEPOLIA_RPC_URL?.slice(0, 40) + "...");
  console.log("👤 Wallet Address:", address);
  console.log("🔢 Nonce:", nonce);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exitCode = 1;
});
