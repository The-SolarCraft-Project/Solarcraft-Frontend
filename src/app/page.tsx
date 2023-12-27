'use client'
import Head from "next/head";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Background from "@/components/Background";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <Head>
        <title>SolarCraft</title>
        <meta property="og:image" content="/build.png" />
      </Head>
      <Header />
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [4, 6, 8] }}>
        <OrbitControls />
        <Background />
      </Canvas>
    </div>
  );
}
