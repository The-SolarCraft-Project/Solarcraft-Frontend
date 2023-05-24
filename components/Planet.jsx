import React from "react";
import { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Planet = ({ file, scale, position,speed}) => {

  const planetRef = useRef();
  const clockRef = new THREE.Clock();

  const updateEarthPosition = useCallback(() => {
    planetRef.current.position.x =
      Math.cos(clockRef.getElapsedTime() * speed) * position[0];
    planetRef.current.position.z =
      Math.sin(clockRef.getElapsedTime() * speed) * position[0];
    planetRef.current.rotation.y += 0.01;
  },[]);

  useFrame(() => {
    updateEarthPosition();
  });

  const gltf = useLoader(GLTFLoader, file);
  return (
    <mesh castShadow ref={planetRef} position={position} scale={scale}>
      <primitive object={gltf.scene} />;
    </mesh>
  );
};

export default Planet;
