// scripts/deployGall.js

const hre = require("hardhat");

async function main() {
  const vestingAddress = "0x48E8189279f03c826745Bfe9f62879B240F297DB"; // Replace this with your wallet or a deployed vesting contract
  const initialOwner = "0x48E8189279f03c826745Bfe9f62879B240F297DB";      // Replace this with your wallet

  const Gall = await hre.ethers.getContractFactory("Gall");
  const gall = await Gall.deploy(vestingAddress, initialOwner);
  await gall.deployed();

  console.log(`✅ Gall token deployed at: ${gall.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
