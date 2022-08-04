import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { main } from "../hooks/alchemy-sdk-script";
import MiniNavbar from "./MiniNavbar";
import NFTCard from "./NFTCard";
import StakeCard from "./StakeCard";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Home() {

  const [nfts, setNfts] = useState<any>([]);

  let query = useQuery();
  let tab = query.get("tab");

  const stakingContract = useSelector(
    (state: any) => state.counter.stakingContract
  );
  const rewardTokenContract = useSelector(
    (state: any) => state.counter.rewardTokenContract
  );
  const collectionContract = useSelector(
    (state: any) => state.counter.collectionContract
  );
  const account = useSelector((state: any) => state.counter.account);
  const library = useSelector((state: any) => state.counter.library);

  const showNfts = async () => {
    if (account) {
      const nfts = await main(account);
      setNfts(nfts);
      console.log(nfts);
    }
  };

  useEffect(() => {
    showNfts();
  }, [account]);

  return (
    <div className="h-full w-full bg-gradient-to-b from-black  to-gray-900 bg-gray-900">
      <div className="mx-auto justify-center flex-col w-3/4 h-full py-8">
        <MiniNavbar />
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px] h-full">
          {tab == undefined ? (
            <>
            {nfts.map((nft:any) => {
              return(
              <NFTCard 
                title={nft?.title}
                description={nft?.description}
                url={nft.metadata?.image}
                id={nft.id?.nftId}
              />
              )
            })}
              {/* <NFTCard />
              <NFTCard />
              <NFTCard /> */}
              
            </>
          ) : null}

          {tab == "staked" ? (
            <>
              <StakeCard />
              <StakeCard />
            </>
          ) : null}

          {tab == "earned" ? (
            <>
              <StakeCard />
              <StakeCard />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
