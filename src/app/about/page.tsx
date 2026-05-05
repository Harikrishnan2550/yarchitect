'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

// Premium easing for architectural fluidity
const premiumEase = [0.16, 1, 0.3, 1];

// ─── ANIMATION VARIANTS ───────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: premiumEase } }
};

const maskReveal = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1.2, ease: premiumEase } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const drawLine = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.5, ease: premiumEase } }
};

const safeImageReveal = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.4, ease: premiumEase } }
};

// ─── DESIGN ELEMENTS ──────────────────────────────────────
const HalftoneFade = ({ className }: { className?: string }) => (
  <div 
    className={`absolute pointer-events-none opacity-[0.07] ${className}`}
    style={{
      backgroundImage: 'radial-gradient(circle, #0F2517 1.5px, transparent 1.5px)',
      backgroundSize: '24px 24px',
      maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)'
    }}
  />
);

// ─── RESPONSIVE MAGNETIC COMPONENT (FIXED FOR VERCEL BUILD) ───
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !ref.current) return; 
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.12, y: middleY * 0.12 });
  };
  
  const reset = () => setPosition({ x: 0, y: 0 });

  // BYPASS: Define props as 'any' to avoid React 19 type errors with Framer Motion
  const motionProps: any = {
    ref: ref,
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    animate: { x: position.x, y: position.y },
    transition: { type: "spring", stiffness: 60, damping: 15, mass: 0.2 },
    className: "inline-block w-full md:w-fit"
  };

  return (
    <motion.div {...motionProps}>
      {children}
    </motion.div>
  );
}

const AnimatedTitle = ({ text, className }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`flex flex-wrap justify-center md:justify-start ${className}`}>
      {words.map((word, index) => (
        <div key={index} className="overflow-hidden mr-[0.25em] mb-[-0.1em]">
          <motion.span variants={maskReveal} className="inline-block">{word}</motion.span>
        </div>
      ))}
    </motion.div>
  );
};

// ─── MAIN PAGE ──────────────────────────────────────────────
export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 50, damping: 20, restDelta: 0.001 });
  
  const { scrollYProgress: parallaxProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const slowParallax = useTransform(parallaxProgress, [0, 1], ["0%", "15%"]);

  return (
    <main className="min-h-screen bg-[#FDFCFB] relative overflow-hidden text-[#0F2517]" ref={containerRef}>
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-[#7A9C7E] origin-left z-[100]" style={{ scaleX }} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-[8%] relative z-10">

        {/* Hero Section */}
        <section className="relative pt-32 md:pt-48 pb-10 md:pb-24 flex flex-col items-start justify-center min-h-[85vh]">
          <HalftoneFade className="top-0 right-0 w-full md:w-1/2 h-full" />
          
          <div className="w-full relative z-10 flex flex-col gap-6 md:gap-16">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A9C7E]" />
                <p className="font-sans text-[#0F2517]/50 tracking-[0.3em] text-[9px] md:text-xs uppercase font-bold">Studio Manifesto</p>
              </motion.div>

              <div className="flex flex-col gap-2">
                <AnimatedTitle text="Shaped by" className="font-serif text-[14vw] md:text-[100px] lg:text-[130px] font-light leading-[0.9] tracking-tighter" />
                <div className="md:pl-16">
                  <AnimatedTitle text="Nature & Time." className="font-serif text-[14vw] md:text-[100px] lg:text-[130px] font-light leading-[0.9] tracking-tighter text-[#7A9C7E] italic" />
                </div>
              </div>
            </motion.div>
            
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full md:max-w-[420px] md:self-end mt-4">
              <p className="font-sans font-light text-[14px] md:text-[16px] leading-[1.8] text-[#0F2517]/70 border-l border-[#7A9C7E]/30 pl-5">
                We sculpt environments from raw laterite and rich timber, crafting enduring spaces that breathe with the tropical ecology of Kerala.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Editorial Content Block */}
        <section className="flex flex-col gap-32 border-t border-[#0F2517]/10 pt-24 relative">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={safeImageReveal} className="w-full lg:w-1/2 h-[65vh] overflow-hidden rounded-3xl relative">
              <motion.img style={{ y: slowParallax }} src="/img4.png" alt="Material Honesty" className="w-full h-full object-cover" />
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="w-full lg:w-1/2">
              <motion.span variants={fadeUp} className="font-sans text-[10px] tracking-[0.3em] text-[#7A9C7E] font-bold uppercase mb-6 flex items-center gap-4">
                01 <span className="w-6 h-[1px] bg-[#7A9C7E]" /> Philosophy
              </motion.span>
              <motion.h3 variants={fadeUp} className="font-serif text-5xl leading-tight text-[#0F2517] mb-8 tracking-tight">Material Honesty</motion.h3>
              <motion.p variants={fadeUp} className="font-sans font-light text-base leading-[1.8] text-[#0F2517]/70 mb-6">
                Using raw exposed laterite and unvarnished timber, we allow our buildings to develop a rich, natural patina over time.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Magnetic CTA Section */}
        <section className="py-40 text-center">
          <Magnetic>
            <Link href="/contact" className="group">
              <motion.span initial="hidden" whileInView="visible" variants={fadeUp} className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#7A9C7E] mb-6 font-bold block">The Next Step</motion.span>
              <div className="overflow-hidden">
                <motion.span initial="hidden" whileInView="visible" variants={maskReveal} className="font-serif text-[10vw] md:text-[100px] italic leading-none group-hover:text-[#7A9C7E] transition-colors duration-700 block">
                  Start your retreat ⟶
                </motion.span>
              </div>
            </Link>
          </Magnetic>
        </section>

      </div>
    </main>
  );
}