const { ethers } = require("hardhat");

async function main() {
  const [deployer, user] = await ethers.getSigners();
  const Gall = await ethers.getContractFactory("Gall");
  const gall = await Gall.deploy();
  await gall.waitForDeployment();

  const WEI_PER_GALL_GRIT = await gall.WEI_PER_GALL_GRIT();
  const oneGall = WEI_PER_GALL_GRIT * 230_630_400n;

  // Transfer 1.5 Gall worth of wei from deployer to user
  const onePointFiveGall = oneGall + oneGall / 2n;

  console.log(`Attempting to transfer 1.5 Gall in wei: ${onePointFiveGall}`);
  await gall.transfer(user.address, onePointFiveGall);

  const userBalance = await gall.balanceOf(user.address);
  console.log(`User balance after transfer: ${userBalance}`);
  console.log(`Should be rounded down to nearest grit multiple: ${userBalance % WEI_PER_GALL_GRIT === 0n}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
