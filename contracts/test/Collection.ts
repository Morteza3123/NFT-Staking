import { ethers } from "hardhat";
import { expect } from "chai";

const toEther = (e:any) => ethers.utils.formatEther(e);
const toWei = (e: string) => ethers.utils.parseEther(e);

describe("Collection", function () {

  async function delpoy() {
    const [owner, account1, account2] = await ethers.getSigners();
    const Collection = await ethers.getContractFactory("Collection");
    const collection = await Collection.deploy();
    return {collection, owner, account1, account2};
  }

  it('mint and burn functions', async () => {
    const {collection, owner, account1, account2} = await delpoy();
    await collection.safeMint(owner.address, "HHH");
    const total = await collection.totalSupply();
    console.log(total)
    expect(await collection.tokenURI(toWei('0'))).to.equal('HHH');
  })


});
