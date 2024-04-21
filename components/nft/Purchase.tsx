import { useEffect, useState } from "react";

import { HiTag } from "react-icons/hi";
import { IoMdWallet } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { buyFromListing } from "thirdweb/extensions/marketplace";
import { useActiveAccount } from "thirdweb/react";
import { mktContract, useListings } from "../../lib/contract";
import { sendAndConfirmTransaction } from "thirdweb";

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
};

const MakeOffer = ({ isListed, selectedNft }) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState<any>();
  const [enableButton, setEnableButton] = useState(false);

  const account = useActiveAccount();

  const listings = useListings();

  useEffect(() => {
    if (!listings || isListed === "false") return;
    (async () => {
      setSelectedMarketNft(
        listings?.data?.find(
          (marketNft) =>
            marketNft.asset?.id?.toString() === selectedNft?.id?.toString()
        )
      );
    })();
  }, [selectedNft, listings, isListed]);

  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return;

    setEnableButton(true);
  }, [selectedMarketNft, selectedNft]);

  const confirmPurchase = (toastHandler = toast) =>
    toastHandler.success(`Purchase successful!`, {
      style: {
        background: "#04111d",
        color: "#fff",
      },
      position: "top-center",
    });

  const buyItem = async (
    listingId = selectedMarketNft.id,
    quantityDesired = 1
  ) => {
    if (!account) return;

    const buyTx = await buyFromListing({
      contract: mktContract,
      listingId: listingId,
      quantity: BigInt(quantityDesired),
      recipient: account.address,
    });

    await sendAndConfirmTransaction({
      transaction: buyTx,
      account: account,
    });

    confirmPurchase();
  };

  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="bottom-left" reverseOrder={false} />
      {isListed === "true" ? (
        <>
          <div
            onClick={() => {
              enableButton ? buyItem(selectedMarketNft.id, 1) : null;
            }}
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Buy Now</div>
          </div>
          <div
            className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
          >
            <HiTag className={style.buttonIcon} />
            <div className={style.buttonText}>Make Offer</div>
          </div>
        </>
      ) : (
        <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
          <IoMdWallet className={style.buttonIcon} />
          <div className={style.buttonText}>List Item</div>
        </div>
      )}
    </div>
  );
};

export default MakeOffer;
