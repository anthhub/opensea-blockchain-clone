import { useEffect } from "react";
import { createThirdwebClient, getContract, defineChain } from "thirdweb";
import { getNFTs } from "thirdweb/extensions/erc721";
import { getAllListings } from "thirdweb/extensions/marketplace";
import {
  useActiveWalletConnectionStatus,
  useConnect,
  useReadContract,
} from "thirdweb/react";
import { createWallet, injectedProvider } from "thirdweb/wallets";

const nftCont = "0x48AdaBCA80998DbeD90A88a153f6049F230a2F39";

const mktCont = "0x659Aede65010302e917c1D6685b212472EBE5311";

const clientId = "78343bb3ed8d18828e2d0324a7050c50";

// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({
  clientId,
});

export const nftContract = getContract({
  client,
  chain: defineChain(11155111),
  address: nftCont,
});

export const mktContract = getContract({
  client,
  chain: defineChain(11155111),
  address: mktCont,
});

export const useNfts = () =>
  useReadContract(getNFTs, {
    contract: nftContract,
  });

export const useListings = () =>
  useReadContract(getAllListings, {
    contract: mktContract,
  });

export const useConnectWallet = () => {
  const { connect, isConnecting, error } = useConnect();
  const status = useActiveWalletConnectionStatus();
  useEffect(() => {
    console.log("status", status);
  }, [status]);

  const connectWallet = () => {
    connect(async () => {
      const metamask = createWallet("io.metamask"); // pass the wallet id
      debugger;
      // if user has metamask installed, connect to it
      if (injectedProvider("io.metamask")) {
        await metamask.connect({ client });
      }
      // open wallet connect modal so user can scan the QR code and connect
      else {
        await metamask.connect({
          client,
          walletConnect: { showQrModal: true },
        });
      }

      // return the wallet
      return metamask;
    });
  };

  return { isConnecting, error, connectWallet };
};
