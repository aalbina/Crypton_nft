import { expect } from "chai";
import { ethers } from "hardhat";
import {Contract, ContractFactory} from "ethers";

describe("NFT1155", function () {
  let NFT: ContractFactory;
  let nft: Contract;

  beforeEach(async function() {
    NFT = await ethers.getContractFactory("NFT1155");
    nft = await NFT.deploy();
  });

  describe("Transactions", function() {
    it("uri should return image uri", async function() {
      expect(await nft.uri(1)).to.equal(
        "https://ipfs.io/ipfs/Qmej6ENUNfAgMn1FRfft6yfHBqRZvSxPfASkD8XwkwBV7D?filename=black_1155.json");
    });
    it("balanceOf should return account balance", async function() {
      const [owner] = await ethers.getSigners();

      expect(await nft.balanceOf(owner.address, 1)).to.equal(1);
    });
  });
});