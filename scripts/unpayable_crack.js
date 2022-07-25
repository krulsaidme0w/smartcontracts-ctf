const hre = require("hardhat");

/*
    Unpayable contract really doesn't want to get your money while you are not millinaire. 
    To complete this round you have to put any amount of MOVRs to contract address even if contract isn't agree with that.
*/

async function main() {
    const [owner, addr] = await hre.ethers.getSigners();

    const Unpayable = await hre.ethers.getContractFactory("Unpayable");
    const unpayable = await Unpayable.connect(owner).deploy();

    const UnpayableCrack = await hre.ethers.getContractFactory("UnpayableCrack");
    const unpayableCrack = await UnpayableCrack.deploy();

    const count = 100;
    
    await unpayableCrack.connect(addr).deposit({ value: count });
    await unpayableCrack.connect(addr).destroy(unpayable.address);

    await unpayable.connect(owner).refund(owner.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
