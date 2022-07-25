const hre = require("hardhat");

/*
    You have a deal with simple bank contract. To complete the level you should steal all funds from contract.
*/

async function main() {
    const [owner, attacker, addr] = await hre.ethers.getSigners();

    const Bank = await hre.ethers.getContractFactory("Bank");
    const bank = await Bank.connect(owner).deploy();

    const BankCrack = await hre.ethers.getContractFactory("BankCrack");
    const bankCrack = await BankCrack.deploy(bank.address);

    const count = 100;
    const smallCount = 10;

    await bank.connect(addr).deposit(addr.address, { value: count });
    await bankCrack.connect(attacker).deposit({ value: smallCount });
    await bankCrack.connect(attacker).getAllBankMoney();

    console.log("BankCrack balance:", String(await bankCrack.balance()))
    console.log("Bank balance:", String(await bank.balance()))
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
