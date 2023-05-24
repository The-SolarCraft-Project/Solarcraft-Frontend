import React, { useRef } from "react";
import AnimatedStars from "./AnimatedStars";
import Star from "./Star";
import Planet from "./Planet";
import { useHelper, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { DataState } from "@/context/DataProvider";

const Background = () => {
  const { stars, planets } = DataState();
  const directionRef = useRef();
  useHelper(directionRef, THREE.DirectionalLightHelper, 0.5, "cyan");
  return (
    <>
      <color attach="background" args={["black"]} />
      <AnimatedStars />
      {stars[0].enable && <Star file={stars[0].file} scale={stars[0].scale}/>}
      {planets.map((planet) => (
        planet.enable && <Planet
          file={planet.file}
          scale={planet.scale}
          position={planet.position}
          speed={planet.speed}
        />
      ))}
    </>
  );
};

export default Background;
