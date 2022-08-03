import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

export const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        http:"https://bridge.walletconnect.org",
        infuraId: '00a9e68117da45a4ae16de81ab0d59d5',
        bridge: "https://bridge.walletconnect.org",
        rpc: {
          56: 'https://bsc-dataseed.binance.org/',
        },
        qrcode: true,
        chainId: 56,
        rpcUrl: 'https://bsc-dataseed.binance.org/'
      },
    },
    binancechainwallet: {
        package: true
      }
  };

 export const web3Modal = new Web3Modal({
    network:"mainnet",
    cacheProvider: true, // optional
    theme:"dark",
    providerOptions // required
  });