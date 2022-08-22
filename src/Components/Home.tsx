import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { main } from "../hooks/alchemy-sdk-script";
import { getMetadata, getNfts } from "../hooks/getMetadata";
import AlertModal from "./AlertModal";
import MiniNavbar from "./MiniNavbar";
import NFTCard from "./NFTCard";
import StakeCard from "./StakeCard";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Home() {
  const [nfts, setNfts] = useState<any>([]);
  const [stakedIds, setStakedIds] = useState<any>([]);
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState("");
  const [notStaked, setNotStaked] = useState(false);
  const [notNft, setNotNft] = useState(false);

  let query = useQuery();
  let tab = query.get("tab");

  const nftStakingContract = useSelector(
    (state: any) => state.counter.nftStakingContract
  );
  const account = useSelector((state: any) => state.counter.account);
  const library = useSelector((state: any) => state.counter.library);

  const showNfts = async () => {
    if (account) {
      const nfts = await getNfts(account);
      setNfts(nfts);
      if (nfts.length === 0) {
        setNotNft(true);
      }
    }
  };

  const showStakedNfts = async () => {
    if (account && tab === "staked" && nftStakingContract) {
      const stakedNfts = await nftStakingContract.tokensOfOwner(account);
      if (stakedNfts.length === 0) {
        setNotStaked(true);
      }
      setStakedIds(stakedNfts);
    }
  };

  useEffect(() => {
    showNfts();
  }, [account]);

  useEffect(() => {
    showStakedNfts();
  }, [tab, account]);

  return (
    <div className="h-full w-full bg-gradient-to-b from-black  to-gray-900 bg-gray-900">
      <div className="mx-auto justify-center flex-col w-3/4 h-full py-8">
        <MiniNavbar />
        
        <div
          className={`p-2 pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px]`}
        >
          {!library ? <div></div> : null}
          {!library ? (
            <div className="grid mx-auto text-center justify-center h-screen pt-10">
              <h1 className="text-white text-xl">Connect your wallet.</h1>
            </div>
          ) : null}

          {tab == undefined ? (
            <>
              {notNft && library ? <div></div> : null}
              {notNft && library ? (
                <div className="grid mx-auto text-center h-screen justify-center pt-10">
                  <h1 className="text-white text-xl">
                    You don't have NFT please mint it.
                  </h1>
                </div>
              ) : null}

              {nfts.map((nft: any) => {
                return (
                  <NFTCard
                    title={nft?.title}
                    description={nft?.description}
                    url={nft.media[0].gateway}
                    id={nft.tokenId}
                    showNfts={showNfts}
                  />
                );
              })}
            </>
          ) : null}

          {tab == "staked" ? (
            <>
              {notStaked && library ? <div></div> : null}
              {notStaked && library ? (
                <div className="grid mx-auto text-center h-screen justify-center pt-10">
                  <h1 className="text-white text-xl">
                    You don't have any staked NFT
                  </h1>
                </div>
              ) : null}

              {stakedIds.map((nftId: any) => {
                return (
                  <StakeCard
                    nftId={nftId}
                    showStakedNfts={() => {
                      showStakedNfts();
                    }}
                    setAlert={setAlert}
                    setStatus={setStatus}
                  />
                );
              })}
            </>
          ) : null}

          {/* {tab == "earned" ? (
            <>
              <StakeCard />
              <StakeCard />
            </>
          ) : null} */}
          {/* </div> */}
        </div>
      </div>
      <AlertModal alertModal={alert} setAlertModal={setAlert} status={status} />
    </div>
  );
}
