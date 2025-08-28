// === deployGrendel.js ===

const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with address:", deployer.address);

    // Deploy Grendel only
    const Grendel = await ethers.getContractFactory("Grendel");
    const grendel = await Grendel.deploy();
    await grendel.deployTransaction.wait();
    console.log("Grendel deployed to:", grendel.address);

    // Vesting contract for Grendel
    const DualLinearVesting = await ethers.getContractFactory("DualLinearVesting");
    const creator = process.env.CREATOR_ADDRESS;
    const community = process.env.COMMUNITY_ADDRESS;

    // Align t=0 with Gall launch timestamp (read from .env)
    const startTime = process.env.GALL_START_TIME;
    const duration = 36 * 30 * 24 * 60 * 60; // ~36 months

    const grendelTotal = await grendel.totalSupply();
    const grendelCreator = grendelTotal.mul(125).div(1000); // 12.5%
    const grendelCommunity = grendelTotal.sub(grendelCreator); // 87.5%

    const grendelVesting = await DualLinearVesting.deploy(
        grendel.address,
        creator,
        community,
        grendelCreator,
        grendelCommunity,
        startTime,
        duration
    );
    await grendelVesting.deployTransaction.wait();
    console.log("Grendel Vesting deployed to:", grendelVesting.address);
    console.log("Vesting startTime (from .env):", startTime);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
