// Github: https://github.com/alchemyplatform/alchemy-sdk-js
// Setup: npm install @alch/alchemy-sdk
import {
  Network,
  Alchemy,
  initializeAlchemy,
  getNftMetadata,
  getNftsForOwner,
} from "@alch/alchemy-sdk";
import { collectionAddress } from "../utils/abi";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "a5GizY0_Rs95iDiLkMYT8tD4yEgVWFKh", // Replace with your Alchemy API Key.
  network: Network.ETH_RINKEBY, // Replace with your network.
  maxRetries: 40,
};

export const getMetadata = async (address:string, id:string) => {
  var alchemy = initializeAlchemy(settings);

  // Print NFT metadata returned in the response:
  const nftMetadata = await getNftMetadata(
    alchemy,
    address,
    id
  );
  return nftMetadata;
};


export const getNfts = async (address:string) => {
    var alchemy = initializeAlchemy(settings);
  
    // Print NFT metadata returned in the response:
    const nfts = await getNftsForOwner(
      alchemy,
      address,
      {contractAddresses:[collectionAddress]}
    );
    return nfts.ownedNfts;

  };

  


