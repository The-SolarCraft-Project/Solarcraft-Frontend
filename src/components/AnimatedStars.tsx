import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const AnimatedStars: React.FC = () => {
  const starsRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0002;
      starsRef.current.rotation.x += 0.0002;
      starsRef.current.rotation.z += 0.0002;
    }
  });

  return <Stars speed={3} ref={starsRef} />;
};

export default AnimatedStars;
