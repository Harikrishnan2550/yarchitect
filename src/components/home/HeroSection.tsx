'use client';
import { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { motion, AnimatePresence, animate, useMotionValue } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const CACHE_BUSTER = '?v=2';

const CAROUSEL_DATA = [
  {
    id: 1,
    imageDesktop: '/img2.png' + CACHE_BUSTER,
    imageMobile: '/img2-mobile.png' + CACHE_BUSTER,
    overline: 'Spatial Poetry',
    heading1: 'Sculpting',
    heading2: 'Light.',
    text: 'We orchestrate the interplay between natural light and raw materials to forge spaces of profound tranquility. Every shadow cast is intentional, every surface carefully curated to elevate the human experience.'
  },
  {
    id: 2,
    imageDesktop: '/img3.png' + CACHE_BUSTER,
    imageMobile: '/img3-mobile.png' + CACHE_BUSTER,
    overline: 'Timeless Elegance',
    heading1: 'Quiet',
    heading2: 'Luxury.',
    text: 'Transcending fleeting trends to establish a lasting legacy of design. We distill complex architectural challenges into effortlessly elegant solutions that breathe with sophisticated simplicity.'
  },
  {
    id: 3,
    imageDesktop: '/img8.png' + CACHE_BUSTER,
    imageMobile: '/img8-mobile.png' + CACHE_BUSTER,
    overline: 'Structural Harmony',
    heading1: 'Living',
    heading2: 'Art.',
    text: 'Blurring the boundaries between landscape and structure. Our environments are not merely built; they are meticulously cultivated to foster a deep, enduring connection with their surroundings.'
  }
];

const ELEGANT_EASE = [0.16, 1, 0.3, 1];

// ==========================================
// WEBGL SHADERS: STRUCTURAL LOUVERS
// ==========================================
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uProgress;
uniform float uImageAspect1;
uniform float uImageAspect2;
uniform float uPlaneAspect;
varying vec2 vUv;

void main() {
  float numLouvers = 7.0;
  float louverIndex = floor(vUv.x * numLouvers);
  
  float centerIndex = floor(numLouvers / 2.0);
  float distFromCenter = abs(louverIndex - centerIndex) / centerIndex;
  
  float delay = distFromCenter * 0.4; 
  float duration = 0.6; 
  
  float localP = clamp((uProgress - delay) / duration, 0.0, 1.0);
  
  // Smooth easing (exponential in-out)
  float p = localP < 0.5 ? 2.0 * localP * localP : -1.0 + (4.0 - 2.0 * localP) * localP;
  
  float dir = mod(louverIndex, 2.0) == 0.0 ? 1.0 : -1.0;
  
  // Screen-space sliding coordinates
  vec2 screen_uv1 = vec2(vUv.x, vUv.y + p * dir);
  vec2 screen_uv2 = vec2(vUv.x, vUv.y + p * dir - dir);
  
  // Texture-space mapped coordinates (object-fit: cover)
  vec2 tex_uv1 = screen_uv1;
  if (uPlaneAspect > uImageAspect1) {
      float scale = uImageAspect1 / uPlaneAspect;
      tex_uv1.y = (tex_uv1.y - 0.5) * scale + 0.5;
  } else {
      float scale = uPlaneAspect / uImageAspect1;
      tex_uv1.x = (tex_uv1.x - 0.5) * scale + 0.5;
  }

  vec2 tex_uv2 = screen_uv2;
  if (uPlaneAspect > uImageAspect2) {
      float scale = uImageAspect2 / uPlaneAspect;
      tex_uv2.y = (tex_uv2.y - 0.5) * scale + 0.5;
  } else {
      float scale = uPlaneAspect / uImageAspect2;
      tex_uv2.x = (tex_uv2.x - 0.5) * scale + 0.5;
  }
  
  vec4 color1 = texture2D(uTexture1, tex_uv1);
  vec4 color2 = texture2D(uTexture2, tex_uv2);

  // Blend based on screen-space boundary
  vec4 finalColor;
  if (dir == 1.0) {
      if (screen_uv1.y < 1.0) {
          finalColor = color1;
      } else {
          finalColor = color2;
      }
  } else {
      if (screen_uv1.y > 0.0) {
          finalColor = color1;
      } else {
          finalColor = color2;
      }
  }
  
  gl_FragColor = finalColor;
}
`;

// ==========================================
// LOUVER TRANSITION COMPONENT
// ==========================================
const LouverTransition = ({ texture1, texture2, progress }: { texture1: THREE.Texture, texture2: THREE.Texture, progress: any }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const aspect1 = texture1.image ? texture1.image.width / texture1.image.height : 16/9;
  const aspect2 = texture2.image ? texture2.image.width / texture2.image.height : 16/9;

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = progress.get();
      materialRef.current.uniforms.uPlaneAspect.value = viewport.width / viewport.height;
      materialRef.current.uniforms.uImageAspect1.value = aspect1;
      materialRef.current.uniforms.uImageAspect2.value = aspect2;
    }
  });

  const uniforms = useMemo(() => ({
    uTexture1: { value: texture1 },
    uTexture2: { value: texture2 },
    uProgress: { value: 0 },
    uImageAspect1: { value: aspect1 },
    uImageAspect2: { value: aspect2 },
    uPlaneAspect: { value: viewport.width / viewport.height }
  }), [texture1, texture2, viewport, aspect1, aspect2]);

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
};

// ==========================================
// WEBGL CANVAS COMPONENT
// ==========================================
function ConstructionCanvas({ currentIndex }: { currentIndex: number }) {
  const desktopTextures = useTexture(CAROUSEL_DATA.map(d => d.imageDesktop));
  const mobileTextures = useTexture(CAROUSEL_DATA.map(d => d.imageMobile));
  
  const { size } = useThree();
  const isMobile = size.width < 768; 
  
  const textures = isMobile ? mobileTextures : desktopTextures;

  const [transitionState, setTransitionState] = useState({
    fromIndex: currentIndex,
    toIndex: currentIndex,
  });

  const progress = useMotionValue(1);

  useEffect(() => {
    if (currentIndex !== transitionState.toIndex) {
      setTransitionState({
        fromIndex: transitionState.toIndex,
        toIndex: currentIndex,
      });
      progress.set(0);
      animate(progress, 1, {
        duration: 2.2, 
        ease: [0.4, 0.0, 0.2, 1], 
      });
    }
  }, [currentIndex, transitionState.toIndex, progress]);

  return (
    <group>
      <LouverTransition
        texture1={textures[transitionState.fromIndex]}
        texture2={textures[transitionState.toIndex]}
        progress={progress}
      />
    </group>
  );
}

// ==========================================
// MAIN HERO SECTION COMPONENT
// ==========================================
export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_DATA.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]); 

  const activeSlide = CAROUSEL_DATA[currentIndex];

  return (
    <section className="relative w-full h-[100dvh] bg-[#01140e] overflow-hidden flex items-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');
      `}</style>

      {/* Full-Bleed WebGL Background Canvas */}
      <div className="absolute inset-0 z-0 bg-[#01140e] overflow-hidden pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
          <Suspense fallback={null}>
            <ConstructionCanvas currentIndex={currentIndex} />
          </Suspense>
        </Canvas>
      </div>

      {/* Foreground: Elegant Staggered Typography Reveal */}
      {/* FIXED: Changed flex alignment from items-end to items-center and removed bottom padding */}
     {/* Foreground: Elegant Staggered Typography Reveal */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-40 h-full flex items-center justify-center">
        {/* ADDED 'mt-20 md:mt-32' here to push it down slightly below center */}
        <div className="w-full flex flex-col items-center justify-center text-center mt-96 md:mt-96">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${activeSlide.id}`}
              initial="hidden" animate="visible" exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
                exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              className="flex flex-col items-center"
            >
              <motion.h1 
                variants={{ 
                  hidden: { opacity: 0, scale: 0, filter: "blur(10px)" }, 
                  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: ELEGANT_EASE } }, 
                  exit: { 
                    opacity: 0, 
                    scale: 0, 
                    filter: "blur(10px)", 
                    transition: { duration: 0.15, ease: "easeIn" } 
                  } 
                }} 
                className="font-[Playfair_Display] text-[clamp(48px,8vw,120px)] leading-[1] tracking-tight flex flex-row flex-wrap justify-center gap-6 md:gap-10"
              >
                <div className="overflow-hidden py-2 px-2">
                  <span className="block bg-clip-text text-transparent bg-gradient-to-b from-[#fdfbf7] to-[#fdfbf7]/20 drop-shadow-2xl">{activeSlide.heading1}</span>
                </div>
                <div className="overflow-hidden py-2 px-2">
                  <span className="block italic font-light bg-clip-text text-transparent bg-gradient-to-tr from-[#d4af37]/80 via-[#fdfbf7]/90 to-[#fdfbf7] drop-shadow-2xl">{activeSlide.heading2}</span>
                </div>
              </motion.h1>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
}