import { task } from "hardhat/config";

task("mint721", "Mint tokens to owner")
  .addParam("token", "Token address")
  .addParam("to", "Reciever address")
  .addParam("id", "Token id")
  .setAction(async (taskArgs, {ethers}) => {
    const contract = await ethers.getContractFactory('NFT721');
    const token = contract.attach(taskArgs.token);
    await token.mint(taskArgs.to, taskArgs.id);
    console.log("Mint task finished");
  });