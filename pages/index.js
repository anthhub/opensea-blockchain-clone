import Header from "../components/Header";
import Hero from "../components/Hero";
import { useEffect } from "react";
import { client as sanityClient } from "../lib/sanityClient";
import toast, { Toaster } from "react-hot-toast";

import { useActiveAccount } from "thirdweb/react";
import { useConnectWallet } from "../lib/contract";

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
};

export default function Home() {
  const { connectWallet } = useConnectWallet();
  const account = useActiveAccount();

  console.log({ account });

  const welcomeUser = (userName = "", toastHandler = toast) => {
    toastHandler.success(
      `Welcome back${userName !== "Unnamed" ? ` ${userName}` : ""}!`,
      {
        style: {
          background: "#04111d",
          color: "#fff",
        },
      }
    );
  };

  useEffect(() => {
    if (!account?.address) return;

    (async () => {
      const userDoc = {
        _type: "users",
        _id: account?.address,
        userName: "Unnamed",
        walletAddress: account?.address,
      };

      const result = await sanityClient.createIfNotExists(userDoc);

      welcomeUser(result.userName);
    })();
  }, [account?.address]);

  return (
    <div className={style.wrapper}>
      <Toaster position="top-center" reverseOrder={false} />
      {account?.address ? (
        <>
          <Header />
          <Hero />
        </>
      ) : (
        <div className={style.walletConnectWrapper}>
          <button
            className={style.button}
            onClick={() => {
              connectWallet();
            }}
          >
            Connect Wallet
          </button>
          <div className={style.details}>
            You need Chrome to be
            <br /> able to run this app.
          </div>
        </div>
      )}
    </div>
  );
}
