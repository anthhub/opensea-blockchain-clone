import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NFTImage from "../../components/nft/NFTImage";
import GeneralDetails from "../../components/nft/GeneralDetails";
import ItemActivity from "../../components/nft/ItemActivity";
import Purchase from "../../components/nft/Purchase";
import { useNfts } from "../../lib/contract";

// const alchemy =
//   "https://eth-sepolia.g.alchemy.com/v2/M0Zkm9Cyexghw0CEXmG8jLpxoXAhU-db";

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
};

const Nft = () => {
  const [selectedNft, setSelectedNft] = useState<any>();
  const router = useRouter();

  const nfts = useNfts();

  // get all NFTs in the collection
  useEffect(() => {
    (async () => {
      const selectedNftItem = nfts?.data?.find(
        (nft) => nft.id?.toString() === router.query.nftId
      );

      setSelectedNft(selectedNftItem);
    })();
  }, [nfts]);

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} />
              <Purchase
                isListed={router.query.isListed}
                selectedNft={selectedNft}
                // listings={listings}
                // marketPlaceModule={marketPlaceModule}
              />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  );
};

export default Nft;
