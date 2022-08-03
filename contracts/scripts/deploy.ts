import { ethers } from "hardhat";

async function main() {
  
  const Collection = await ethers.getContractFactory("Collection");
  const collection = await Collection.deploy();
  await collection.deployed();
  const RewardToken = await ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy();
  await rewardToken.deployed();
  const NftStaking = await ethers.getContractFactory("NftStaking");
  const nftStaking = await NftStaking.deploy(collection.address, rewardToken.address);
  await nftStaking.deployed();

  
  
  console.log("Collection contract deployed to:", collection.address);
  console.log("RewardToken contract deployed to:", rewardToken.address);
  console.log("NftStaking contract deployed to:", nftStaking.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
