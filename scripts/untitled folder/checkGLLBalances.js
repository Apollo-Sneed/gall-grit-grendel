const { ethers } = require("hardhat");

async function main() {
  const tokenAddress = "0x775b0D5528C2EfCDC418F7CB99193704B80A9C18";
  const vestingAddress = "0x381dC357E7Cb1F7c37652AEAa5D55AC9919AD4D6";
  const [deployer] = await ethers.getSigners();

  const Gall = await ethers.getContractAt("Gall", tokenAddress);
  const creatorBalance = await Gall.balanceOf(deployer.address);
  const vestingBalance = await Gall.balanceOf(vestingAddress);
  const totalSupply = await Gall.totalSupply();
  
  console.log(`🪙 Total Supply: ${ethers.formatUnits(totalSupply, 18)} GLL`);
  console.log(`👤 Creator Wallet: ${ethers.formatUnits(creatorBalance, 18)} GLL`);
  console.log(`⛓️  Vesting Contract: ${ethers.formatUnits(vestingBalance, 18)} GLL`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
