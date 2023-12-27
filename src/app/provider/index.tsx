import React, { PropsWithChildren, ReactNode } from "react";
import { useContext } from "react";
import {
  useContract,
  useContractWrite,
  useAddress,
  useMetamask,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { DataContext } from "../context";

const DataProvider = ({ children }: PropsWithChildren<{}>) => {
  const address = useAddress();
  const connect = useMetamask();

  const basicNFT = useContract("0x3f7d44D6c3D574dd390d818b66d24aBb45d61b2D");
  const nftMarketPlace = useContract(
    "0x8b2AC629B200f7244A0ac5669d6D5a8556A8b0Ba"
  );
  const ethtoUsdConvertor = useContract(
    "0x86dA2866a7Ad9257d04D398109783F7654348954"
  );
  const nftStorage = useContract("0xBb4976E719857Aebd833C2Bed940a110d8A4bA3C");

  const { mutateAsync: mintNFT } = useContractWrite(
    basicNFT.contract,
    "mintNFT"
  );
  const { mutateAsync: approve } = useContractWrite(
    basicNFT.contract,
    "approve"
  );

  const { mutateAsync: listItem } = useContractWrite(
    nftMarketPlace.contract,
    "listItem"
  );

  const { mutateAsync: buyItem } = useContractWrite(
    nftMarketPlace.contract,
    "buyItem"
  );

  const { mutateAsync: updateListing } = useContractWrite(
    nftMarketPlace.contract,
    "updateListing"
  );

  const { mutateAsync: cancelListing } = useContractWrite(
    nftMarketPlace.contract,
    "cancelListing"
  );
  const { mutateAsync: withdrawProceeds } = useContractWrite(
    nftMarketPlace.contract,
    "withdrawProceeds"
  );

  const { mutateAsync: getConversionRate } = useContractWrite(
    ethtoUsdConvertor.contract,
    "getConversionRate"
  );

  const { mutateAsync: addNFT } = useContractWrite(
    nftStorage.contract,
    "addNFT"
  );
  const { mutateAsync: removeNFT } = useContractWrite(
    nftStorage.contract,
    "removeNFT"
  );
  const { mutateAsync: updateNFT } = useContractWrite(
    nftStorage.contract,
    "updateNFT"
  );

  const { data, isLoading } = useContractRead(
    nftMarketPlace.contract,
    "getProceeds",
    [address]
  );

  const createNFT = async (tokenURI: string) => {
    try {
      toast.info("Minting NFT...");
      const data: any = await mintNFT({
        args: [address, tokenURI],
      });
      const tokenId = await data.receipt.events[0].args.tokenId;
      toast.success(`NFT Minted ${tokenId}`);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const listNFT = async (tokenId: number, price: number) => {
    try {
      toast.info("Approving NFT...");
      console.log("Approving NFT");
      const receipt = await approve({
        args: ["0x8b2AC629B200f7244A0ac5669d6D5a8556A8b0Ba", tokenId],
      });
      console.log(receipt);
      toast.success(`NFT Approved ${tokenId}`);
      toast.info("Listing NFT...");
      const data = await listItem({
        args: ["0x3f7d44D6c3D574dd390d818b66d24aBb45d61b2D", tokenId, price],
      });
      toast.success(`NFT Listed ${tokenId}`);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const buyNFT = async (tokenId: number, amount: string) => {
    try {
      toast.info("Buying NFT...");
      const data = await nftMarketPlace.contract?.call(
        "buyItem",
        ["0x3f7d44D6c3D574dd390d818b66d24aBb45d61b2D", tokenId],
        {
          value: ethers.utils.parseEther(amount),
        }
      );
      toast.success(`${tokenId} now ownedby ${address}`);
      console.log(data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const updatePrice = async (tokenId: number, newPrice: number) => {
    try {
      const data = await updateListing({
        args: ["0x3f7d44D6c3D574dd390d818b66d24aBb45d61b2D", tokenId, newPrice],
      });
      toast.success(`Price Updated`);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const cancelNFT = async (tokenId: number) => {
    try {
      const data = await cancelListing({
        args: ["0x3f7d44D6c3D574dd390d818b66d24aBb45d61b2D", tokenId],
      });
      toast.success(`#${tokenId} Removed`);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const convert = async (value: number) => {
    try {
      const data = await getConversionRate({ args: [value] });
      const decimalValue:number = parseInt(data._hex, 16);
      return decimalValue;
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const withdraw = async () => {
    try {
      const data = await withdrawProceeds({ args: [] });
      toast.success(`Proceeds Withdrawn`);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const addNFTFun = async (
    tokenId: number,
    scale: number,
    speed: number,
    x: number,
    y: number,
    z: number
  ) => {
    try {
      const data = await addNFT({
        args: [
          "0x3f7d44D6c3D574dd390d818b66d24aBb45d61b2D",
          tokenId,
          scale,
          speed,
          x,
          y,
          z,
        ],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const updateNFTFun = async (
    tokenId: number,
    scale: number,
    speed: number,
    x: number,
    y: number,
    z: number
  ) => {
    try {
      const data = await updateNFT({
        args: [
          "0x3f7d44D6c3D574dd390d818b66d24aBb45d61b2D",
          tokenId,
          scale,
          speed,
          x,
          y,
          z,
        ],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const removeNFTFun = async (tokenId: number) => {
    try {
      const data = await removeNFT({
        args: ["0x3f7d44D6c3D574dd390d818b66d24aBb45d61b2D", tokenId],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  return (
    <DataContext.Provider
      value={{
        basicNFT,
        nftMarketPlace,
        connect,
        address,
        mintNFT: createNFT,
        listItem: listNFT,
        buyNFT,
        updateListing: updatePrice,
        cancelListing: cancelNFT,
        withdrawProceeds: withdraw,
        addNFT: addNFTFun,
        updateNFT: updateNFTFun,
        removeNFT: removeNFTFun,
        data,
        convert,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const DataState = () => {
  return useContext(DataContext);
};

export default DataProvider;
