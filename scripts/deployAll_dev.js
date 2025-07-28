// === deployAll_dev.js ===

const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with address:", deployer.address);

    const Gall = await ethers.getContractFactory("Gall");
    const gall = await Gall.deploy();
    await gall.deployTransaction.wait(); // <- changed
    // await gall.deployed();
    console.log("Gall deployed to:", gall.address);

    const Grit = await ethers.getContractFactory("Grit");
    const grit = await Grit.deploy();
    await grit.deployTransaction.wait(); // <- changed
    // await grit.deployed();
    console.log("Grit deployed to:", grit.address);

    const Grendel = await ethers.getContractFactory("Grendel");
    const grendel = await Grendel.deploy();
    await grendel.deployTransaction.wait(); // <- changed
    // await grendel.deployed();
    console.log("Grendel deployed to:", grendel.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
