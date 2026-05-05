'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HomeBackground() {
  const { scrollYProgress } = useScroll();
  const shadowMove = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <>
      <svg className="pointer-events-none fixed inset-0 z-50 opacity-[0.12] mix-blend-overlay w-full h-full">
        <filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(to right, transparent, transparent 40px, rgba(0,0,0,0.8) 40px, rgba(0,0,0,0.8) 42px)` }}></div>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-gold/5 blur-[120px] rounded-full mix-blend-screen"></div>
        <motion.div 
          style={{ x: shadowMove, y: shadowMove }} 
          className="absolute -top-[50%] -right-[20%] w-[200%] h-[200%] transform rotate-[-35deg] flex flex-col gap-24 opacity-[0.2] mix-blend-multiply blur-3xl"
        >
          <div className="w-full h-40 bg-black"></div><div className="w-full h-40 bg-black"></div>
          <div className="w-full h-40 bg-black"></div><div className="w-full h-40 bg-black"></div>
        </motion.div>
      </div>
    </>
  );
}