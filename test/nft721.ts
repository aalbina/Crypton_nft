import { expect } from "chai";
import { ethers } from "hardhat";
import {Contract, ContractFactory} from "ethers";

describe("NFT721", function () {
  let NFT: ContractFactory;
  let nft: Contract;

  beforeEach(async function() {
    NFT = await ethers.getContractFactory("NFT721");
    nft = await NFT.deploy();
  });

  describe("Deployment", function() {
    it("Should return the its name", async function() {
      expect(await nft.name()).to.equal("Crypton ERC-721 task");
    });
    it("Should return the its symbol", async function() {
      expect(await nft.symbol()).to.equal("ACET7");
    });
  });

  describe("Transactions", function() {
    it("tokenURI should return image uri", async function() {
      expect(await nft.tokenURI(1)).to.equal(
        "https://ipfs.io/ipfs/QmaTeWhhRmcHAsVrVERWFHvYsarf6B2BZ3e4eHzu9bhQgq?filename=black.json");
    });
    it("balanceOf should return account balance", async function() {
      const [owner] = await ethers.getSigners();

      expect(await nft.balanceOf(owner.address)).to.equal(1);
    });
    it("ownerOf should return owner of image", async function() {
      const [owner] = await ethers.getSigners();

      expect(await nft.ownerOf(1)).to.equal(owner.address);
    });
    it("safeTransferFrom should transfer image", async function() {
      const [owner, addr1, addr2] = await ethers.getSigners();

      await nft.approve(addr1.address, 1);

      await nft.connect(addr1).transferFrom(owner.address, addr2.address, 1);

      expect(await nft.balanceOf(addr2.address)).to.equal(1);
      expect(await nft.balanceOf(owner.address)).to.equal(0);
    });
    it("approve should give permission", async function() {
      const [owner, addr1] = await ethers.getSigners();

      await nft.approve(addr1.address, 1);

      expect(await nft.getApproved(1)).to.equal(addr1.address);
    });
    it("approve should give permission for only one", async function() {
      const [owner, addr1, addr2] = await ethers.getSigners();

      await nft.approve(addr1.address, 1);
      await nft.approve(addr2.address, 1);

      expect(await nft.getApproved(1)).to.equal(addr2.address);
    });
    it("setApprovalForAll should give permission for all", async function() {
      const [owner, addr1] = await ethers.getSigners();

      await nft.setApprovalForAll(addr1.address, true);

      expect(await nft.isApprovedForAll(owner.address, addr1.address)).to.equal(true);
    });
    it("setApprovalForAll should remove permission for all", async function() {
      const [owner, addr1] = await ethers.getSigners();

      await nft.setApprovalForAll(addr1.address, false);

      expect(await nft.isApprovedForAll(owner.address, addr1.address)).to.equal(false);
    });
    it("mint should add tokens", async function() {
      const [owner] = await ethers.getSigners();

      await nft.mint(owner.address, 2);

      expect(await nft.balanceOf(owner.address)).to.equal(2);
    });
    it("mint should check owner", async function() {
      const [owner, addr1] = await ethers.getSigners();

      await expect(
        nft.mint(addr1.address, 2)
      ).to.be.revertedWith("Not owner");
    });
  });
});