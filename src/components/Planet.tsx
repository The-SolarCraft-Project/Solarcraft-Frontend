import React, { useEffect, useState, useRef, useCallback } from "react";
import { Vector3, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useNFT } from "@thirdweb-dev/react";
import { DataState } from "@/app/provider";
import { GLTF } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

interface PlanetProps {
  tokenId: string;
  scale: number;
  position: number[];
  speed: number;
}

const Planet: React.FC<PlanetProps> = ({
  tokenId,
  scale,
  position,
  speed,
}) => {
  const { basicNFT } = DataState();
  const [object, setObject] = useState<THREE.Object3D | undefined>();
  const nft = useNFT(basicNFT.contract, tokenId);
  const [reload, setReload] = useState<boolean>(true);

  const planetRef = useRef<THREE.Mesh>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());

  const updateEarthPosition = useCallback(() => {
    if (planetRef.current) {
      planetRef.current.position.x =
        Math.cos(clockRef.current.getElapsedTime() * speed) * position[0];
      planetRef.current.position.z =
        Math.sin(clockRef.current.getElapsedTime() * speed) * position[0];
      planetRef.current.rotation.y += 0.01;
    }
  }, [position, speed]);

  useFrame(() => {
    updateEarthPosition();
  });

  useEffect(() => {
    const loadGLTF = async () => {
      if (nft.data && nft.data.metadata && nft.data.metadata.file) {
        const gltf = await new Promise<GLTF>((resolve, reject) => {
          new GLTFLoader().load(
            nft.data.metadata.file as string,
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
  }, [nft, object, reload]);

  return (
    <mesh castShadow ref={planetRef} position={position as Vector3} scale={scale}>
      {object && <primitive object={object} />}
    </mesh>
  );
};

export default Planet;