import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

const toEther = (e:any) => ethers.utils.formatEther(e);
const toWei = (e: string) => ethers.utils.parseEther(e);

describe("NfrStake", function () {

  async function delpoy() {

    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    const [owner, account1, account2] = await ethers.getSigners();
    const Collection = await ethers.getContractFactory("Collection");
    const collection = await Collection.deploy();
    const RewardToken = await ethers.getContractFactory("RewardToken");
    const rewardToken = await RewardToken.deploy();
    const NftStaking = await ethers.getContractFactory("NftStaking");
    const nftStaking = await NftStaking.deploy(collection.address, rewardToken.address);
    return {collection, rewardToken, nftStaking, owner, account1, account2, unlockTime};
  }

  it('stake and unstake function', async () => {
    const {collection, rewardToken, nftStaking, owner, account1, account2, unlockTime} = await delpoy();
    await rewardToken.addController(nftStaking.address);
    await collection.connect(account1).safeMint(account1.address, "HHH");
    await collection.connect(account1).safeMint(account1.address, "GGG");
    await collection.connect(account1).approve(nftStaking.address, ('1'));
    await nftStaking.connect(account1).stake([('1')]);
    await time.increaseTo(unlockTime);
    const earnedInfo = await nftStaking.connect(account1).earningInfo(account1.address, [('1')]);
    console.log(toEther(earnedInfo[0]));
    await nftStaking.connect(account1).unstake([('1')]);
    const earned = await rewardToken.balanceOf(account1.address);
    console.log(toEther(earned));
    console.log(toEther(await rewardToken.totalSupply()));

  })

  it('change controllers', async () => {
    const {collection, rewardToken, nftStaking, owner, account1, account2} = await delpoy();
    
  })


});
