import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { web3Modal } from "./Web3Modal";
import { ethers } from "ethers";
import { setAccount, setLibrary, setCollectionContract, setRewardTokenContract, setNftStakingContract } from "../state/counterSlice";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { collectionAbi, collectionAdress, nftStakingAbi, nftStakingAddress, rewardTokenAbi, rewardTokenAddress } from "../utils/abi";
import { useSpring, animated } from "react-spring";

export default function Navbar() {

  const props1 = useSpring({
    to: { opacity: 1 },
    delay: 300,
    config: { duration: 3000 },
    from: { opacity: 0 },
  });

  const dispatch = useDispatch();
  const account = useSelector((state: any) => state.counter.account);
  const library = useSelector((state: any) => state.counter.library);
  const rewardTokenContract = useSelector((state: any) => state.counter.rewardTokenContract);
  const collectionContract = useSelector((state: any) => state.counter.collectionContract);
  const nftStakingContrct = useSelector((state: any) => state.counter.nftStakingContrct);

  const connect = async () => {
    
    const provider = await web3Modal.connect();
    const library = new ethers.providers.Web3Provider(provider);
    if (library) {
      dispatch(setLibrary(library));
    }
    const accounts = await library.listAccounts();
    if (accounts) {
      dispatch(setAccount(accounts[0]));
    }
    localStorage.setItem("NftStaking", "injected");
    const rewardTokenContract = new ethers.Contract(rewardTokenAddress, rewardTokenAbi, library)
    dispatch(setRewardTokenContract(rewardTokenContract));
    const collectionContract = new ethers.Contract(collectionAdress, collectionAbi, library)
    dispatch(setCollectionContract(collectionContract));
    const nftStakingContract = new ethers.Contract(nftStakingAddress, nftStakingAbi, library)
    dispatch(setNftStakingContract(nftStakingContrct));
  };

  const disConnect = async () => {
    if(library){
      await web3Modal.clearCachedProvider();
      dispatch(setLibrary(null));
      dispatch(setAccount(''));
      dispatch(setRewardTokenContract(null));
      dispatch(setCollectionContract(null));
      dispatch(setNftStakingContract(null));
      localStorage.clear()
    }
  }

  useEffect(() => {
    const wallet = localStorage.getItem("NftStaking")
    if(wallet === "injected"){
      connect()
    }
  },[])

  return (
    <nav className=" w-full h-16 px-4 bg-black text-gray-50 ">
      <animated.div style={props1}>
        <div className="flex justify-between items-center">
      <a className="flex-start text-xl" href="http://localhost:3000/">
        NFT-Staking
      </a>
      <ul className="navbar-nav px-3">
        <li className="nav-item">
          {!account ? (
            <button
              className="text-secondary border-solid border-2 border-sky-100 shadow-md shadow-sky-100 py-3 rounded-3xl p-4 px-6 hover:bg-gray-800 active:border-gray-200"
              onClick={() => connect()}
            >
              Connect
            </button>
          ) : (
            <div className="flex">
              <button
                className="text-secondary border-solid border-2 border-sky-100 shadow-md shadow-sky-400 px-2 md:py-3 rounded-3xl md:p-4 md:px-6 hover:bg-gray-800 active:border-gray-200"
                onClick={() => connect()}
              >
                {`${account.slice(0, 5)} .... ${account.slice(-6, -1)}`}
              </button>
              <div
                className="bg-red-700 hover:bg-red-600 my-auto  mx-2 p-2 rounded-3xl "
                title={"logout"}
              >
                <RiLogoutCircleRLine
                  className="Disconnect cursor-pointer text-white dark:text-gray-200 text-xl md:text-3xl"
                  onClick={() => disConnect()}
                />
              </div>
            </div>
          )}
        </li>
      </ul>
      </div>
      </animated.div>
    </nav>
  );
}
