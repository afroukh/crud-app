const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Crud", function () {
    async function deployCrudFixture() {
        const Crud = await ethers.getContractFactory("Crud");
        const crud = await Crud.deploy();

        return { crud };
    }

    it("should create a new user", async function () {
        const { crud } = await loadFixture(deployCrudFixture);

        await crud.create("Alice", 30);
        const user = await crud.read(0);
        expect(user.name).to.equal("Alice");
        expect(user.age).to.equal(30);
    });

    it("should update an existing user", async function () {
        const { crud } = await loadFixture(deployCrudFixture);

        await crud.create("Bob", 40);
        await crud.update(0, "Bob Updated", 45);
        const user = await crud.read(0);
        expect(user.name).to.equal("Bob Updated");
        expect(user.age).to.equal(45);
    });

    it("should delete an existing user", async function () {
        const { crud } = await loadFixture(deployCrudFixture);

        await crud.create("Charlie", 25);
        await crud.deleteUser(0);
        await expect(crud.read(0)).to.be.revertedWith("User not found");
    });
});