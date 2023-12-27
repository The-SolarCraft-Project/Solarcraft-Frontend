import React, { useEffect, useState } from "react";
import ListCard from "./ListCard";
import { gql, useQuery, TypedDocumentNode } from "urql";
import { Spinner } from "@material-tailwind/react";

const query: TypedDocumentNode<
  { activeItems: ResponseType[] },
  { buyer: string }
> = gql`
  query GetActiveItems($buyer: String!) {
    activeItems(where: { buyer: $buyer }) {
      id
      buyer
      nftAddress
      price
      seller
      tokenId
    }
  }
`;

const Home: React.FC = () => {
  const [{ data, fetching, error },reexecuteQuery] = useQuery({
    query: query,
    variables: { buyer: "0x0000000000000000000000000000000000000000" },
  });
  const [refresh, setRefresh] = useState<boolean>(false);
  //   const QueryURL =
  //     "https://api.studio.thegraph.com/query/46447/solarcraft-database/version/latest";

  useEffect(() => {
    reexecuteQuery({ requestPolicy: 'network-only' });
  }, []);

  return (
    <div className="h-[475px] overflow-y-scroll scrollbar-hide">
      <div
        className={`m-3 flex flex-wrap ${
          fetching && "justify-center items-center"
        } h-5/6`}
      >
        {fetching ? (
          <Spinner color="indigo" className="h-16 w-16" />
        ) : (
          data?.activeItems.map((nft: any,index:number) => (
            <ListCard
              key={index}
              tokenId={nft.tokenId}
              price={nft.price}
              seller={nft.seller}
              setRefresh={setRefresh}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
