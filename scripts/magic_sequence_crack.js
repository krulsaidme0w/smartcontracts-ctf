const { ethers } = require("hardhat");
const hre = require("hardhat");

/*
    Bob isn't really good in crypto and he decided to hide 4 secret numbers in contract.
    To complete this round you should got true return from by calling start method.
*/

async function main() {
    const [owner, attacker] = await hre.ethers.getSigners();

    const MagicSequence = await hre.ethers.getContractFactory("MagicSequence");
    const magicSequence = await MagicSequence.connect(owner).deploy();

    const MagicSequenceCrack = await hre.ethers.getContractFactory("MagicSequenceCrack");
    const magicSequenceCrack = await MagicSequenceCrack.deploy(magicSequence.address);

    await magicSequenceCrack.connect(attacker).start();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
