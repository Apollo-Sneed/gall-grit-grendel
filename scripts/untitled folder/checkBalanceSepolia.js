const { ethers } = require("hardhat");
async function main() {
  const [signer] = await ethers.getSigners();
  const bal = await ethers.provider.getBalance(signer.address);
  console.log("ETH balance:", ethers.formatEther(bal), "ETH");
}
main();
