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
  vec2 uv = vUv;
  
  float t = uProgress;
  // Custom cubic ease-in-out curve
  float ease = t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
  
  // Texture-space cover logic for image 1
  vec2 tex_uv1 = uv;
  if (uPlaneAspect > uImageAspect1) {
      float scale = uImageAspect1 / uPlaneAspect;
      tex_uv1.y = (tex_uv1.y - 0.5) * scale + 0.5;
  } else {
      float scale = uPlaneAspect / uImageAspect1;
      tex_uv1.x = (tex_uv1.x - 0.5) * scale + 0.5;
  }

  // Texture-space cover logic for image 2
  vec2 tex_uv2 = uv;
  if (uPlaneAspect > uImageAspect2) {
      float scale = uImageAspect2 / uPlaneAspect;
      tex_uv2.y = (tex_uv2.y - 0.5) * scale + 0.5;
  } else {
      float scale = uPlaneAspect / uImageAspect2;
      tex_uv2.x = (tex_uv2.x - 0.5) * scale + 0.5;
  }
  
  vec4 color1 = texture2D(uTexture1, tex_uv1);
  vec4 color2 = texture2D(uTexture2, tex_uv2);
  
  // Simple, pure, ultra-smooth cross-fade dissolve
  gl_FragColor = mix(color1, color2, ease);
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
        duration: 2.0, 
        ease: "easeInOut", 
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
        {/* Pushed down slightly below center for visual balance */}
        <div className="w-full flex flex-col items-center justify-center text-center mt-20 md:mt-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${activeSlide.id}`}
              initial="hidden" animate="visible" exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
                exit: { opacity: 0, transition: { staggerChildren: 0.1, staggerDirection: -1 } }
              }}
              className="flex flex-col items-center"
            >
              <motion.h1 
                variants={{ 
                  hidden: { opacity: 0, scale: 0.96, filter: "blur(8px)" }, 
                  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1.5, ease: ELEGANT_EASE } }, 
                  exit: { 
                    opacity: 0, 
                    scale: 0.96, 
                    filter: "blur(5px)", 
                    transition: { duration: 0.5, ease: "easeIn" } 
                  } 
                }} 
                className="font-[Playfair_Display] text-[clamp(48px,8vw,120px)] leading-[1.25] tracking-tight flex flex-row flex-wrap justify-center gap-6 md:gap-10 drop-shadow-2xl"
              >
                <div className="py-2 px-2">
                  <span className="inline-block leading-[1.25] px-4 bg-clip-text text-transparent bg-gradient-to-b from-[#FFFFFF] to-[#E5E5E5]">{activeSlide.heading1}</span>
                </div>
                <div className="py-2 px-2">
                  <span className="inline-block leading-[1.25] px-4 italic font-light bg-clip-text text-transparent bg-gradient-to-r from-[#F0E2C6] via-[#D4AF37] to-[#B39247]">{activeSlide.heading2}</span>
                </div>
              </motion.h1>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
}