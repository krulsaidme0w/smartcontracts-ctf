const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

/*
    Unpayable contract really doesn't want to get your money while you are not millinaire. 
    To complete this round you have to put any amount of MOVRs to contract address even if contract isn't agree with that.
*/

describe("Unpayable contract", function () {
    async function deployUnpayableFixture() {
        const [owner, addr] = await ethers.getSigners();

        const Unpayable = await ethers.getContractFactory("Unpayable");

        const unpayable = await Unpayable.deploy();

        return { Unpayable, unpayable, owner, addr };
    }

    it("Deployment should assign owner to msg.sender", async function () {
        const { unpayable, owner } = await loadFixture(deployUnpayableFixture);

        const unpayableOwner = await unpayable.owner;
        expect(owner, await unpayable.owner)
    });

    it("Put more than 500 eth", async function () {
        const { unpayable, owner } = await loadFixture(deployUnpayableFixture);
        
        await expect (
            unpayable.connect(owner).putMoney({ value: ethers.utils.parseEther("500.000000000000000001") })
        ).to.changeEtherBalances([owner, unpayable], ["-500000000000000000001", "500000000000000000001"]);
    });

    it("Put less than 500 eth", async function () {
        const { unpayable, owner } = await loadFixture(deployUnpayableFixture);
        
        await expect (
            unpayable.connect(owner).putMoney({ value: ethers.utils.parseEther("5") })
        ).to.be.revertedWith("doesn't accept too small amount");
    });

    it("Refund from owner", async function () {
        const { unpayable, owner, addr } = await loadFixture(deployUnpayableFixture);
        
        unpayable.connect(owner).putMoney({ value: ethers.utils.parseEther("500.000000000000000001") });

        await expect (
            unpayable.connect(owner).refund(addr.address)
        ).to.changeEtherBalances([addr, unpayable], ["500000000000000000001", "-500000000000000000001"]);
    });

    it("Refund not from owner", async function () {
        const { unpayable, owner, addr } = await loadFixture(deployUnpayableFixture);

        unpayable.connect(owner).putMoney({ value: ethers.utils.parseEther("500.000000000000000001") });

        await expect (
            unpayable.connect(addr).refund(addr.address)
        ).to.be.revertedWith("only owner can call refund");
    });

    it("Fallback", async function () {
        const { unpayable, owner } = await loadFixture(deployUnpayableFixture);
        
        unpayable.connect(owner).fallback()
    });
});
