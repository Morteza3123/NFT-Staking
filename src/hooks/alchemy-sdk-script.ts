import { createAlchemyWeb3 } from "@alch/alchemy-web3" ;
import { collectionAddress } from "../utils/abi";

const web3 = createAlchemyWeb3(
    "https://eth-rinkeby.alchemyapi.io/v2/eGGscrzfhgHptrBOvm906z0W1V6qphF-",
);

export const main = async (address:string) => {
    

    // Get all NFTs
    const nfts = await
        web3.alchemy.getNfts({ owner: address, contractAddresses:[collectionAddress] })

    // Print NFTs
    return(nfts.ownedNfts);
}