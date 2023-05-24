import React from "react";
import { useRef, useCallback } from "react";
import { useFrame } from '@react-three/fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader} from "@react-three/fiber";

const Star = ({file,scale}) => {
  const starRef = useRef();
   
  const updateEarthPosition = useCallback(() => {
    starRef.current.rotation.y += 0.01;
  }, []);


  useFrame(() => {
    updateEarthPosition()
  });
  const gltf = useLoader(GLTFLoader, file);
  return (
    <mesh ref={starRef} position={[0, 0, 0]} scale={scale}>
      <directionalLight position={[0, 0, 0]} intensity={5} />
      <ambientLight intensity={0.5}/>
      <primitive object={gltf.scene} position={[0,0,0]}/>;
      <pointLight position={[0, 0, 0]} intensity={3} color="#fff"/>
    </mesh>
  );
};

export default Star;
