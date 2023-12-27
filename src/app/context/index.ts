import { SmartContract, UseContractResult } from "@thirdweb-dev/react";
import { createContext } from "react";

type ContextType = {
  data: string;
  basicNFT: UseContractResult<SmartContract>;
  nftMarketPlace: UseContractResult<SmartContract>;
  mintNFT: (tokenURI: string) => void;
  listItem: (tokenId: number, price: number) => void;
  connect: () => void;
  buyNFT: (tokenId: number, amount: string) => void;
  address: string | undefined;
  updateListing: (tokenId: number, newPrice: number) => void;
  cancelListing: (tokenId: number) => void;
  withdrawProceeds: () => void;
  convert: (value: number) => Promise<number | undefined>;
  addNFT: (
    tokenId: number,
    scale: number,
    speed: number,
    x: number,
    y: number,
    z: number
  ) => void;
  updateNFT: (
    tokenId: number,
    scale: number,
    speed: number,
    x: number,
    y: number,
    z: number
  ) => void;
  removeNFT: (tokenId: number) => void;
};

export const DataContext = createContext<ContextType>({} as ContextType);
