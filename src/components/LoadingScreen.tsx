// frontend/src/components/LoadingScreen.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const timeout = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = ''; 
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="splash"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          // 1. Swapped the solid green for a rich, deep vignette gradient
          className="fixed inset-0 z-[100] bg-gradient-to-b from-[#050806] via-forest to-[#020403] flex flex-col items-center justify-center overflow-hidden"
        >
          
          {/* 2. Added a subtle gold/green glow behind the logo to create 3D depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative z-10"
          >
            <Image 
              src="/logo1.png" 
              alt="Y Architects Logo" 
              width={200} 
              height={80} 
              // Added a deeper shadow directly to the image
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}