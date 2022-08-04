import { FaEthereum } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";

const NFTCard = (props: any) => {
  console.log("HHH", props.url)
  const cid = (u: string) => {
    if (props.url) {
      console.log(props.url)
      return u.substring(u.indexOf("/ipfs/") + 6);
    }
  };
  // const title = props.tilte;
  // const description = props.description;
  // const nftId = props.nftId;

  return (
    <div className="flex flex-col rounded-[4px] w-full border-solid border-2 border-gray-100 p-3">
      <div className="relative">
        <LazyLoadImage
          src={`https://nftstorage.link/ipfs/${cid(props.url)}`}
          // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjcj0BdNL6beCLSRLzwYD6oMzkiRLgCvUs0w&usqp=CAU"
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
          <Link
            to="props.productLinkAddress"
            className="inline-flex justify-center mx-auto items-center max-w-full py-2 px-3 text-sm font-medium text-center text-slate-100 bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Stake
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
    </div>
  );
};

export default NFTCard;
