import { FaEthereum } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
import { getMetadata } from "../hooks/getMetadata";
import { useSelector } from "react-redux";
import { collectionAddress } from "../utils/abi";
import Loading from "./Loading";
import AlertModal from "./AlertModal";
import { toEther, toWei } from "../hooks/ethersFunctions";

const StakeCard = (props: any) => {

  const [url, setUrl] = useState<any>('');
  const [loading, setLoading] = useState(false); //* Toggler for loading modal *//
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState("");
  const [earned, setEarned] = useState<any>();
  const [metadata, setMetadata] = useState<any>({
    title: "",
    description: "",
    media:[{gateway:''}]
  });

  const collectionContract = useSelector(
    (state: any) => state.counter.collectionContract
  );

  const nftStakingContract = useSelector(
    (state: any) => state.counter.nftStakingContract
  );

  const rewardTokenContract = useSelector(
    (state: any) => state.counter.rewardTokenContract
  );

  const account = useSelector((state: any) => state.counter.account);
  const library = useSelector((state: any) => state.counter.library);

  const showData = async () => {
    const metadata = await getMetadata(collectionAddress, props.nftId);
    setUrl(metadata?.media[0].gateway.substring(metadata?.media[0].gateway.indexOf("/ipfs/") + 6));
    setMetadata(metadata);
  };

  const showEarned = async () => {
    if(rewardTokenContract){
      const earned = await nftStakingContract.earningInfo(account, [props.nftId]);
      setEarned(toEther(earned[0]))
    }
  }

  useEffect(() => {
    showEarned();
  }, [rewardTokenContract]);

  useEffect(() => {
    showData();
  }, []);




  const unstake = async () => {

    if(collectionContract && nftStakingContract){
      try {
        setLoading(true);
        const signer = await library.getSigner();
        const res = await nftStakingContract.connect(signer).unstake([props.nftId], {gasLimit: 3000000});
        const receipt = await res.wait();
        if(receipt.status == 1){
          setLoading(false);
          props.setAlert(true);
          props.setStatus('success');
          props.showStakedNfts();
        }else{
          setLoading(false);
          props.setAlert(true);
          props.setStatus('failed');
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }

  return (
    <div className="flex flex-col rounded-[4px] w-full border-solid border-2 border-gray-100 p-3">
      <div className="relative">
        <LazyLoadImage
          src={url !==''? `https://nftstorage.link/ipfs/${url}` : ''}
          alt="image"
          className="w-full object-cover rounded-[4px] aspect-square"
        />
      </div>
      <div className="flex flex-col pt-4 mt-4">
        <p className="text-gray-900 dark:text-slate-100 mb-2">{metadata.title}</p>
        <div className="gitd flex-wrap justify-between items-center">
          <div className="grid flex-col mb-3 mr-3">
            <p className="text-[#62666d] dark:text-slate-400 mb-1 text-sm">
              {metadata.description}
            </p>
          </div>
          <div className="grid flex-col mb-3 mr-3">
            <h2 className="text-gray-200">Earned:</h2>
            <p className="text-[#62666d] dark:text-slate-400 mb-1 text-sm">
              {earned ? (<> {Number(earned).toFixed(4)} RWT Token</>): null}
            </p>
          </div>
          <div className="flex">
          <button
            onClick={unstake}
            className="inline-flex justify-center mx-auto items-center max-w-full py-2 px-3 text-lg font-medium text-center text-slate-100 bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
          >
            {loading ? <Loading /> : "UNSTAKE"}
            
          </button>
          </div>
        </div>
      </div>
      <AlertModal alertModal={alert} setAlertModal={setAlert} status={status} />
    </div>
  );
};

export default StakeCard;
