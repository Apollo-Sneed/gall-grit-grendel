// === deployAllThreeWithVesting.js ===

const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with address:", deployer.address);

    // Deploy Gall
    const Gall = await ethers.getContractFactory("Gall");
    const gall = await Gall.deploy();
    await gall.deployTransaction.wait();
    console.log("Gall deployed to:", gall.address);

    // Deploy Grit
    const Grit = await ethers.getContractFactory("Grit");
    const grit = await Grit.deploy();
    await grit.deployTransaction.wait();
    console.log("Grit deployed to:", grit.address);

    // Deploy Grendel
    const Grendel = await ethers.getContractFactory("Grendel");
    const grendel = await Grendel.deploy();
    await grendel.deployTransaction.wait();
    console.log("Grendel deployed to:", grendel.address);

    const DualLinearVesting = await ethers.getContractFactory("DualLinearVesting");
    const creator = process.env.CREATOR_ADDRESS;
    const community = process.env.COMMUNITY_ADDRESS;
    const startTime = Math.floor(Date.now() / 1000) + 60;
    const duration = 36 * 30 * 24 * 60 * 60;

    // Vesting for Gall
    const gallTotal = await gall.totalSupply();
    const gallCreator = gallTotal.mul(125).div(1000);
    const gallCommunity = gallTotal.sub(gallCreator);
    const gallVesting = await DualLinearVesting.deploy(
        gall.address,
        creator,
        community,
        gallCreator,
        gallCommunity,
        startTime,
        duration
    );
    await gallVesting.deployTransaction.wait();
    console.log("Gall Vesting deployed to:", gallVesting.address);

    // Vesting for Grit
    const gritTotal = await grit.totalSupply();
    const gritCreator = gritTotal.mul(125).div(1000);
    const gritCommunity = gritTotal.sub(gritCreator);
    const gritVesting = await DualLinearVesting.deploy(
        grit.address,
        creator,
        community,
        gritCreator,
        gritCommunity,
        startTime,
        duration
    );
    await gritVesting.deployTransaction.wait();
    console.log("Grit Vesting deployed to:", gritVesting.address);

    // Vesting for Grendel
    const grendelTotal = await grendel.totalSupply();
    const grendelCreator = grendelTotal.mul(125).div(1000);
    const grendelCommunity = grendelTotal.sub(grendelCreator);
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
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
