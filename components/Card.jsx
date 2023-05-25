import React from "react";
import Image from "next/image";
import { useStorageUpload } from "@thirdweb-dev/react";
import { DataState } from "../context/DataProvider";

const Card = ({ name, price, image, file }) => {
  const { stars, setStars, planets, setPlanets, mintNFT } = DataState();
  const { mutateAsync: upload } = useStorageUpload();

  const handleClick = async () => {
    const metadata = {
      name: name,
      description: "This is a Celestial Body",
      image: file,
      attributes: [
        {
          trait_type: "CB",
          value: 100,
        },
      ],
    };
    const jsonData = JSON.stringify(metadata, null, 2);
    const uploadUrl = await upload({
      data: [jsonData],
      options: {
        uploadWithGatewayUrl: true,
        uploadWithoutDirectory: true,
      },
    });
    const txRecipt = mintNFT(uploadUrl[0]);
    console.log(txRecipt);
    if (txRecipt) {
      setStars((prev) => {
        return prev.map((star) => {
          if (star.name === name) {
            return { ...star, enable: true };
          }
          return star;
        });
      });
      setPlanets((prev) => {
        return prev.map((planet) => {
          if (planet.name === name) {
            return { ...planet, enable: true };
          }
          return planet;
        });
      });
    }
  };

  return (
    <div className="h-72 w-56 m-5 bg-white rounded-md">
      <div className="w-full h-4/6 rounded-md relative">
        <Image className="rounded-t-md" src={image} alt={name} fill={true} />
      </div>
      <h1 className="mx-2 mt-1 text-lg">NFT Name: {name}</h1>
      <h1 className="mx-2 text-lg flex flex-row">
        Price: {price}
        <Image alt={name} src="/static/ether.png" height={20} width={20} />
      </h1>
      {name === "Venus" || name === "Mars" ? (
        <button className="text-gray-500 bg-gray-100 border-2 hover:bg-gray-300 border-gray-500 rounded-xl px-5 py-1 mx-14 my-4">
          Disabled
        </button>
      ) : (
        <button
          className="text-blue-400 bg-white hover:bg-blue-100 border-2 border-blue-400 rounded-xl px-5 py-1 mx-8 my-4 flex flex-row"
          onClick={handleClick}
        >
          Mint and Add
          <Image
            className="m-1"
            alt={name}
            src="/static/lightning-icon.png"
            height={10}
            width={10}
          />
        </button>
      )}
    </div>
  );
};

export default Card;
