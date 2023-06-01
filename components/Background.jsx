import React, { useRef,useState,useEffect } from "react";
import AnimatedStars from "./AnimatedStars";
import Planet from "./Planet";
import { useHelper, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { createClient } from "urql";
import { DataState } from "../context/DataProvider";

const Background = () => {
  const directionRef = useRef();
  const { address } = DataState();
  const [nfts, setNfts] = useState([]);
  useHelper(directionRef, THREE.DirectionalLightHelper, 0.5, "cyan");
  const QueryURL =
    "https://api.studio.thegraph.com/query/46447/solarcraft-database/version/latest";
  const query = `{
    itemAddeds(where: {enable: true, owner: "${address}"}) {
      scale
      speed
      tokenId
      x
      y
      z
      enable
    }
  }`;


  useEffect(() => {
    const getNFTs = async () => {
      if(address){
        const client = createClient({
          url: QueryURL,
        });
        const { data } = await client.query(query).toPromise();
        if (data.itemAddeds !== nfts) {
          setNfts(data.itemAddeds);
        }
      }
    };
    getNFTs();
  }, [address,nfts]);

  

  return (
    <>
      <color attach="background" args={["black"]} />
      <AnimatedStars />
      <ambientLight intensity={0.5} />
      {nfts.map(
        (nft) =>
          nft.enable && (
            <Planet
              tokenId={nft.tokenId}
              scale={nft.scale/100}
              speed={nft.speed/100}
              position={[nft.x/100, nft.y/100, nft.z/100]}
            />
          )
      )}
    </>
  );
};

export default Background;
