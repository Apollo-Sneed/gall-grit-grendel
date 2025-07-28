// deployAllDev.js (Dev-Friendly Version)

const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const creatorAddress = deployer.address;

  const GRITS_PER_GALL = 230_630_400n;
  const totalGall = 6250000000n;
  const totalGrits = totalGall * GRITS_PER_GALL;

  const start = Math.floor(Date.now() / 1000) + 60;
  const duration = 36 * 30 * 24 * 60 * 60;

  console.log("🧑‍💻 Deploying with wallet:", creatorAddress);
  console.log("🚧 Total vesting amount:", totalGrits.toString(), "grits");

  const Gall = await ethers.getContractFactory("GallDev");
  const dummyVestingAddress = "0x0000000000000000000000000000000000000001";
  const gall = await Gall.deploy(creatorAddress, dummyVestingAddress);
  await gall.waitForDeployment();
  const gallAddress = await gall.getAddress();
  console.log("✅ GallDev deployed at:", gallAddress);

  const LinearVesting = await ethers.getContractFactory("LinearVestingDev");
  const vesting = await LinearVesting.deploy(
    gallAddress,
    creatorAddress,
    totalGrits,
    start,
    duration
  );
  await vesting.waitForDeployment();
  const vestingAddress = await vesting.getAddress();
  console.log("✅ LinearVestingDev deployed at:", vestingAddress);

  const tx1 = await gall.updateVestingAddress(vestingAddress);
  await tx1.wait();
  console.log("🔗 GallDev vesting address updated.");

  const tx2 = await gall.transfer(vestingAddress, totalGrits);
  await tx2.wait();
  console.log("💰 Transferred", totalGrits.toString(), "grits to dev vesting contract.");

  console.log("\n🎉 Dev Deployment Complete");
  console.log("📌 GallDev Token:     ", gallAddress);
  console.log("📌 Dev Vesting Contract:", vestingAddress);
  console.log("🪙 Total Grits:        ", totalGrits.toString());
  console.log("⏳ Starts At:          ", start);
  console.log("📆 Duration:           ", duration, "seconds");
}

main().catch((err) => {
  console.error("❌ Deployment Error:", err);
  process.exitCode = 1;
});

