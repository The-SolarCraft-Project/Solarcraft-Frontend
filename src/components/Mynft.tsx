import React, { useEffect, useState } from "react";
import Card from "./Card";
import { DataState } from "../app/provider";
import { gql, useQuery, TypedDocumentNode } from "urql";
import { Spinner } from "@material-tailwind/react";

const query: TypedDocumentNode<
  { itemOwneds: ResponseType[] },
  { owner: string | undefined }
> = gql`
  query GetItemOwneds($owner: String!) {
    itemOwneds(where: { owner: $owner }) {
      id
      owner
      tokenId
    }
  }
`;

const Mynft: React.FC = () => {
  const { address } = DataState();
  const [{ data, fetching, error },reexecuteQuery] = useQuery({
    query: query,
    variables: { owner: address },
  });

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
          data?.itemOwneds.map((nft: any, index: number) => (
            <Card key={index} tokenId={nft.tokenId} />
          ))
        )}
      </div>
    </div>
  );
};

export default Mynft;
