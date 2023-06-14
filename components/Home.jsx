import React, { useEffect, useState } from "react";
import ListCard from "./ListCard";
import { createClient } from "urql";

const Home = () => {
  const [nfts, setNfts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const QueryURL =
    "https://api.studio.thegraph.com/query/46447/solarcraft-database/version/latest";
  const query = `{
    activeItems(where: {buyer:"0x0000000000000000000000000000000000000000" }) {
      id
      buyer
      nftAddress
      price
      seller
      tokenId
    }
  }`;

  const client = createClient({
    url: QueryURL,
  });

  useEffect(() => {
    const getNFTs = async () => {
      const { data } = await client.query(query).toPromise();
      if (data.activeItems!==nfts) {
        setNfts(data.activeItems);
      }
    };
    getNFTs();
  }, [nfts,refresh]);

  return (
    <div className="h-[475px] overflow-y-scroll scrollbar-hide">
      <div className="m-3 flex flex-wrap">
        {nfts.map((nft) => {
          return (
            <ListCard
              tokenId = {nft.tokenId}
              price = {nft.price}
              seller = {nft.seller}
              setRefresh = {setRefresh}
            />
          );
        })}
      </div>
    </div>
  )
}

export default Home