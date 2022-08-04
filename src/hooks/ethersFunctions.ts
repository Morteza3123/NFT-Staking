import { ethers } from "ethers";


export const toEther = (e:any) => ethers.utils.formatEther(e);
export const toWei = (e: string) => ethers.utils.parseEther(e);