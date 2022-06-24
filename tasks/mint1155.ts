import { task } from "hardhat/config";
import { randomBytes } from "ethers/lib/utils";

task("mint1155", "Mint tokens to owner")
  .addParam("token", "Token address")
  .addParam("to", "Reciever address")
  .addParam("id", "Token id")
  .addParam("amount", "Token amount")
  .setAction(async (taskArgs, {ethers}) => {
    const contract = await ethers.getContractFactory('NFT1155');
    const token = contract.attach(taskArgs.token);
    await token.mint(taskArgs.to, taskArgs.id, taskArgs.amount, randomBytes(1));
    console.log("Mint task finished");
  });