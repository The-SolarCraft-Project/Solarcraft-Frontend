import React, { useRef, useState, useEffect } from "react";
import AnimatedStars from "./AnimatedStars";
import Planet from "./Planet";
import { useHelper, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useQuery } from "urql";
import { DataState } from "@/app/provider";

type Nft = {
  scale: number;
  speed: number;
  tokenId: string;
  x: number;
  y: number;
  z: number;
  enable: boolean;
};

const Background: React.FC = () => {
  const directionRef = useRef<THREE.DirectionalLight>();
  const { address } = DataState();
  const [nfts, setNfts] = useState<Nft[]>([]);
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
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: query,
    variables: {},
  });

  useEffect(() => {
    reexecuteQuery({ requestPolicy: "network-only" });
    setNfts(data?.itemAddeds);
  }, [address, nfts]);

  return (
    <>
      <color attach="background" args={["black"]} />
      <AnimatedStars />
      <ambientLight intensity={0.5} />
      {data?.itemAddeds.map(
        (nft: Nft, index: number) =>
          nft.enable && (
            <Planet
              key={index}
              tokenId={nft.tokenId}
              scale={nft.scale / 100}
              speed={nft.speed / 100}
              position={[nft.x / 100, nft.y / 100, nft.z / 100]}
            />
          )
      )}
    </>
  );
};

export default Background;
