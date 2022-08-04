import { FaEthereum } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";

const StakeCard = () => {
  return (
    <div className="flex flex-col rounded-[4px] w-full border-solid border-2 border-gray-100 p-3">
      <div className="relative">
        <LazyLoadImage
          //   src={props.productImageUrl}
          src="https://images0.persgroep.net/rcs/9C10cf--lAe9L8LFV_wSDLQdDMY/diocontent/207433411/_fitwidth/763?appId=93a17a8fd81db0de025c8abd1cca1279&quality=0.8"
          alt="image"
          className="w-full object-cover rounded-[4px] aspect-square"
        />
        
      </div>
      <div className="flex flex-col pt-4 mt-4">
        <p className="text-gray-900 dark:text-slate-100 mb-2">
          NFT NAME
        </p>
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex flex-col mb-3 mr-3">
            <p className="text-[#62666d] dark:text-slate-400 mb-1 text-sm">
              This is for nft Description If you want to know about that
              This is for nft Description If you want to know about that
            </p>
            {/* <p className="text-gray-900 dark:text-slate-100 flex items-center">
              <FaEthereum className="mr-1" />
              props.productPrice ETH
            </p> */}
          </div>
          <Link
            to='props.productLinkAddress'
            className="inline-flex items-center max-w-full py-2 px-3 text-sm font-medium text-center text-slate-100 bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            UNSTAKE
            <svg
              className="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StakeCard;
