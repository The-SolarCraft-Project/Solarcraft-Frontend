import React, { useEffect, useState } from "react";
import Card from "./Card";
import { createClient } from "urql";
import { DataState } from "../context/DataProvider";

const Mynft = () => {
  const { address } = DataState();
  const [nfts, setNfts] = useState([]);
  const QueryURL =
    "https://api.studio.thegraph.com/query/46447/solarcraft-database/version/latest";
  const query = `{
    itemOwneds (where:{owner: "${address}"}) {
      id
      owner
      tokenId
    }
  }`;

  const client = createClient({
    url: QueryURL,
  });

  useEffect(() => {
    const getNFTs = async () => {
      const { data } = await client.query(query).toPromise();
      if (data.itemOwneds !== nfts) {
        setNfts(data.itemOwneds);
      }
    };
    getNFTs();
  }, [nfts]);

  return (
    <div className="h-[475px] overflow-y-scroll scrollbar-hide">
      <div className="m-3 flex flex-wrap">
        {nfts.map((nft) => {
          return <Card tokenId={nft.tokenId} />;
        })}
      </div>
    </div>
  );
};

export default Mynft;
