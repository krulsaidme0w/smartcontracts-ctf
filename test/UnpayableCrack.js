const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("UnpayableCrack contract", function () {
    async function deployUnpayableCrackFixture() {
        const [addr] = await ethers.getSigners();

        const UnpayableCrack = await ethers.getContractFactory("UnpayableCrack");

        const unpayableCrack = await UnpayableCrack.deploy();

        return { UnpayableCrack, unpayableCrack, addr };
    }

    it("Deposit eth", async function () {
        const { unpayableCrack, addr } = await loadFixture(deployUnpayableCrackFixture);
        const count = 100

        await expect (
            unpayableCrack.connect(addr).deposit({ value: count })
        ).to.changeEtherBalances([addr, unpayableCrack], [-count, count])
    });

    it("Destroy contract send eth to address", async function () {
        const { unpayableCrack, addr } = await loadFixture(deployUnpayableCrackFixture);
        const count = 100

        unpayableCrack.connect(addr).deposit({ value: count })

        await expect (
            unpayableCrack.destroy(addr.address)
        ).to.changeEtherBalances([unpayableCrack, addr], [-count, count]);
    });

});
