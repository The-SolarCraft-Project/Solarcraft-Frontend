import React from "react";
import { createContext, useState, useContext } from "react";
import { starArray, planetArray } from "../assets/Resource";
import {
  useContract,
  useContractWrite,
  useAddress,
  useMetamask,
} from "@thirdweb-dev/react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const { contract } = useContract(
    "0x7Faee8aCa22De6e0B51ed6a970B125045Df71338"
  );
  const { mutateAsync: mintNFT, isLoading } = useContractWrite(
    contract,
    "mintNFT"
  );
  const address = useAddress();
  const connect = useMetamask();

  const getNFT = async (tokenURI) => {
    try {
      const data = await mintNFT({
        args: [address, tokenURI],
      });
      return data;
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const [stars, setStars] = useState(starArray);
  const [planets, setPlanets] = useState(planetArray);
  return (
    <DataContext.Provider
      value={{
        stars,
        setStars,
        planets,
        setPlanets,
        mintNFT: getNFT,
        connect,
        address,
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
