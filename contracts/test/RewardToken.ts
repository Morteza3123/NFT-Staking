import { ethers } from "hardhat";
import { expect } from "chai";

const toEther = (e:any) => ethers.utils.formatEther(e);
const toWei = (e: string) => ethers.utils.parseEther(e);

describe("Collection", function () {

  async function delpoy() {
    const [owner, account1, account2] = await ethers.getSigners();
    const RewardToken = await ethers.getContractFactory("RewardToken");
    const rewardToken = await RewardToken.deploy();
    return {rewardToken, owner, account1, account2};
  }

  it('mint and burn functions', async () => {
    const {rewardToken, owner, account1, account2} = await delpoy();
    expect(await rewardToken.controllers(owner.address)).to.equal(true);
    await rewardToken.mint(owner.address, toWei('1000'));
    expect(toEther(await rewardToken.totalSupply())).to.equal('1000.0');
    expect(toEther(await rewardToken.balanceOf(owner.address))).to.equal('1000.0');
    await rewardToken.burnFrom(owner.address, toWei('200'));
    expect(toEther(await rewardToken.balanceOf(owner.address))).to.equal('800.0');
  })

  it('change controllers', async () => {
    const {rewardToken, owner, account1, account2} = await delpoy();
    expect(await rewardToken.controllers(account1.address)).to.equal(false);
    await rewardToken.addController(account1.address);
    expect(await rewardToken.controllers(account1.address)).to.equal(true);
    await rewardToken.removeController(account1.address);
    expect(await rewardToken.controllers(account1.address)).to.equal(false);
  })


});
