import { FaEthereum } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import { toEther } from "../hooks/ethersFunctions";
import { useSelector } from "react-redux";
import { useState } from "react";
import AlertModal from "./AlertModal";
import Loading from "./Loading";

const NFTCard = (props: any) => {

  const [loading, setLoading] = useState(false); //* Toggler for loading modal *//
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState("");

  // const showNfts = props.showNfts()

  const nftStakingContract = useSelector(
    (state: any) => state.counter.nftStakingContract
  );
  const rewardTokenContract = useSelector(
    (state: any) => state.counter.rewardTokenContract
  );
  const collectionContract = useSelector(
    (state: any) => state.counter.collectionContract
  );
  const account = useSelector((state: any) => state.counter.account);
  const library = useSelector((state: any) => state.counter.library);

  const cid = (u: string) => {
    if (props.url) {
      return u.substring(u.indexOf("/ipfs/") + 6);
    }
  };
  
  const stake = async () => {
    if(collectionContract && nftStakingContract){
      try {
        setLoading(true);
        const signer = await library.getSigner();
        await collectionContract.connect(signer).approve(nftStakingContract.address, props.id);
        const res = await nftStakingContract.connect(signer).stake([props.id], {gasLimit: 3000000});
        const receipt = await res.wait();
        if(receipt.status == 1){
          setLoading(false);
          setAlert(true);
          setStatus('success');
          props.showNfts();
        }else{
          setLoading(false);
          setAlert(true);
          setStatus('failed')
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
          src={`https://nftstorage.link/ipfs/${cid(props.url)}`}
          alt="image"
          className="w-full object-cover rounded-[4px] aspect-square"
        />
      </div>
      <div className="flex flex-col pt-4 mt-4">
        <p className="text-gray-900 dark:text-slate-100 mb-2">{props.title}</p>
        <div className="gitd flex-wrap justify-between items-center">
          <div className="grid flex-col mb-3 mr-3">
            <p className="text-[#62666d] dark:text-slate-400 mb-1 text-sm">
              {props.description}
            </p>
          </div>
          <div className="flex">
          <button
            onClick={stake}
            className="inline-flex justify-center mx-auto items-center max-w-full py-2 px-3 text-lg font-medium text-center text-slate-100 bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? <Loading /> : "STAKE"}
            
          </button>
          </div>

        </div>
      </div>
      <AlertModal alertModal={alert} setAlertModal={setAlert} status={status} />
    </div>
  );
};

export default NFTCard;
