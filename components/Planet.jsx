import React, { useEffect, useState } from "react";
import { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useNFT } from "@thirdweb-dev/react";
import { DataState } from "../context/DataProvider";

const Planet = ({ tokenId, scale, position, speed }) => {
  const { basicNFT } = DataState();
  const [object, setObject] = useState();
  const nft = useNFT(basicNFT.contract, tokenId);
  const [reload, setReload] = useState(true);

  const planetRef = useRef();
  const clockRef = new THREE.Clock();

  const updateEarthPosition = useCallback(() => {
    planetRef.current.position.x =
      Math.cos(clockRef.getElapsedTime() * speed) * position[0];
    planetRef.current.position.z =
      Math.sin(clockRef.getElapsedTime() * speed) * position[0];
    planetRef.current.rotation.y += 0.01;
  }, []);

  useFrame(() => {
    updateEarthPosition();
  });

  useEffect(() => {
    const loadGLTF = async () => {
      if (nft.data && nft.data.metadata && nft.data.metadata.file) {
        const gltf = await new Promise((resolve, reject) => {
          new GLTFLoader().load(
            nft.data.metadata.file,
            resolve,
            undefined,
            reject
          );
        });
        if (object !== gltf.scene && reload) {
          console.log("object", object);
          setObject(gltf.scene);
          setReload(false);
        }
      }
    };

    loadGLTF();
  }, [nft]);

  return (
    <mesh castShadow ref={planetRef} position={position} scale={scale}>
      {object && <primitive object={object} />}
    </mesh>
  );
};

export default Planet;
