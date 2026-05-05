'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

const premiumEase = [0.16, 1, 0.3, 1];

// ─── ANIMATION VARIANTS ────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: premiumEase } 
  }
};

const sideReveal = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 1.2, ease: premiumEase } 
  }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const drawLine = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.5, ease: premiumEase } }
};

// ─── TACTILE BACKGROUNDS ──────────────────────────────────────────
const FilmGrain = () => (
  <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 h-full w-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const SoftGlow = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none z-0 rounded-full blur-[60px] md:blur-[120px] opacity-20 animate-pulse ${className}`} style={{ animationDuration: '8s' }} />
);

export default function ServicesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20, restDelta: 0.001 });

  const services = [
    { num: "01", title: "Master Planning", desc: "Orchestrating large-scale visions and structural frameworks that define how people live and move through space.", focus: ["Terrain Analysis", "Site Zoning", "Ecology"] },
    { num: "02", title: "Architecture", desc: "Comprehensive design solutions focusing on structural integrity, spatial purity, and regional climatic response.", focus: ["Concept Design", "Vastu Harmony", "Blueprints"] },
    { num: "03", title: "Interiors", desc: "Integrating raw materials, bespoke joinery, and warm textures to elevate the tactile, intimate experience of a space.", focus: ["Lighting Design", "Custom Millwork", "Acoustics"] },
    { num: "04", title: "Landscapes", desc: "Integrating climate-responsive flora and natural light to ensure structures breathe seamlessly with the environment.", focus: ["Native Flora", "Water Management", "Hardscaping"] }
  ];

  const processSteps = [
    { title: "Context", desc: "Understanding land, sun paths, and monsoon directions." },
    { title: "Vision", desc: "Translating requirements into initial spatial concepts." },
    { title: "Refinement", desc: "Precise material selection and structural engineering." },
    { title: "Execution", desc: "Ensuring the build mirrors the blueprint perfectly." }
  ];

  return (
    <main className="min-h-screen bg-cream relative overflow-hidden text-forest selection:bg-sage selection:text-white" ref={containerRef}>
      
      <FilmGrain />
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-sage origin-left z-[100]" style={{ scaleX: smoothProgress }} />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative pt-40 md:pt-48 pb-10 md:pb-12 px-6 md:px-[8%] max-w-[1600px] mx-auto min-h-[40vh] flex flex-col justify-center">
        <SoftGlow className="top-10 right-10 w-[200px] md:w-[600px] h-[200px] md:h-[600px] bg-sage" />

        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          animate="visible" 
          className="w-full relative z-10"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end w-full gap-8 lg:gap-20">
            
            <div className="w-full">
              
              
              <div className="flex flex-col gap-1">
                <div className="overflow-hidden">
                   <motion.h1 variants={sideReveal} className="font-serif text-[12vw] md:text-[10vw] lg:text-[120px] font-light leading-[1] tracking-tighter">
                    The Art of
                  </motion.h1>
                </div>
                <div className="overflow-hidden lg:pl-24">
                  <motion.h1 variants={sideReveal} className="font-serif text-[12vw] md:text-[10vw] lg:text-[120px] font-light leading-[1] tracking-tighter italic text-sage">
                    Structure.
                  </motion.h1>
                </div>
              </div>
            </div>

            <motion.div variants={sideReveal} className="max-w-full md:max-w-[400px] lg:max-w-[340px] flex flex-col gap-5 mt-4">
              <p className="font-sans font-light text-[14px] md:text-[16px] leading-[1.7] text-forest/70 border-l border-sage/30 pl-5 relative">
                <motion.span initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, ease: premiumEase, delay: 0.8 }} className="absolute left-[-1px] top-0 w-[2px] h-full bg-sage origin-top" />
                Unified architectural and spatial disciplines to sculpt environments that elevate daily life.
              </p>
              
              <Link href="#disciplines" className="inline-flex items-center gap-4 group">
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-forest font-bold group-hover:text-sage transition-colors">Start Scroll</span>
                <span className="w-6 h-[1px] bg-forest group-hover:w-12 group-hover:bg-sage transition-all duration-700 ease-out" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── 2. SERVICE LIST ── */}
      <section id="disciplines" className="relative py-12 md:py-40 px-6 md:px-[8%] max-w-[1600px] mx-auto z-10 border-t border-forest/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-32 relative items-start">
          
          <div className="lg:col-span-4 sticky top-32 hidden lg:flex flex-col gap-6">
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-sage font-bold">Index 01</span>
            <motion.h2 initial="hidden" whileInView="visible" variants={sideReveal} className="font-serif text-[60px] font-light text-forest tracking-tighter leading-none">Our <br/><span className="italic text-sage">Legacy.</span></motion.h2>
            <motion.p initial="hidden" whileInView="visible" variants={sideReveal} className="font-sans font-light text-[15px] leading-[1.8] text-forest/60 max-w-[280px]">
              A holistic approach to construction and design, from planning to tactile interior details.
            </motion.p>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-12 md:gap-40">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, amount: 0.2 }} 
                variants={staggerContainer}
                className="flex flex-col group"
              >
                <div className="flex flex-row items-baseline gap-4 md:gap-8 mb-4">
                  <motion.span variants={sideReveal} className="font-serif text-[10vw] md:text-[80px] italic text-sage/30 group-hover:text-sage transition-colors duration-700">
                    {service.num}
                  </motion.span>
                  <motion.h3 variants={sideReveal} className="font-serif text-[8vw] md:text-[56px] text-forest tracking-tight font-light leading-tight">{service.title}</motion.h3>
                </div>
                
                <div className="md:pl-[120px] flex flex-col gap-5">
                  <motion.p variants={sideReveal} className="font-sans font-light text-[14px] md:text-[18px] leading-[1.7] text-forest/70 max-w-2xl">
                    {service.desc}
                  </motion.p>
                  <motion.div variants={sideReveal} className="flex flex-wrap gap-2 md:gap-3">
                    {service.focus.map((item, i) => (
                      <span key={i} className="px-3 py-1 rounded-full border border-forest/10 bg-white/40 backdrop-blur-sm font-sans text-[8px] md:text-[11px] tracking-[0.2em] uppercase text-forest/80 group-hover:border-sage transition-colors duration-500">
                        {item}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. METHODOLOGY ── */}
      <section className="relative py-16 md:py-48 bg-forest text-cream overflow-hidden rounded-[1.5rem] md:rounded-[2rem] mx-4 md:mx-[2%] shadow-2xl">
        <div className="max-w-[1400px] mx-auto px-6 md:px-[8%] relative z-10">
          <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-32 gap-6">
            <div>
              <motion.p variants={sideReveal} className="font-sans text-[9px] tracking-[0.3em] uppercase text-sage font-bold mb-3">The Approach</motion.p>
              <motion.h2 variants={sideReveal} className="font-serif text-[10vw] md:text-[80px] text-cream font-light tracking-tighter">The Process.</motion.h2>
            </div>
            <motion.p variants={sideReveal} className="font-sans font-light text-[14px] leading-[1.7] text-cream/60 max-w-[300px]">
              Collaboration through rigorous design development.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {processSteps.map((step, idx) => (
              <motion.div key={idx} initial="hidden" whileInView="visible" variants={staggerContainer} className="flex flex-col group">
                <motion.div variants={drawLine} className="w-full h-[1px] bg-cream/10 mb-6 origin-left group-hover:bg-sage transition-colors duration-700" />
                <motion.span variants={sideReveal} className="font-sans text-[9px] tracking-[0.3em] uppercase text-sage font-bold mb-3">Phase 0{idx + 1}</motion.span>
                <motion.h3 variants={sideReveal} className="font-serif text-xl md:text-3xl text-cream mb-2 font-light">{step.title}</motion.h3>
                <motion.p variants={sideReveal} className="font-sans font-light text-[13px] leading-[1.6] text-cream/50">{step.desc}</motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FOOTER CTA ── */}
      <section className="relative py-20 md:py-64 text-center bg-cream overflow-hidden">
        <div className="flex flex-col items-center px-6 w-full relative z-10">
          <motion.span initial="hidden" whileInView="visible" variants={fadeUp} className="font-sans text-[9px] tracking-[0.3em] uppercase text-sage mb-6 font-bold flex items-center gap-4">
            <span className="w-6 h-[1px] bg-sage" />
            Let&apos;s Create
            <span className="w-6 h-[1px] bg-sage" />
          </motion.span>
          
          <Link href="/contact" className="group">
            <motion.h2 initial="hidden" whileInView="visible" variants={sideReveal} className="font-serif text-[9vw] md:text-[80px] font-light text-forest tracking-tighter leading-[1.1]">
              Commission <span className="italic text-sage group-hover:text-forest transition-colors duration-700">the Future ⟶</span>
            </motion.h2>
          </Link>
        </div>
      </section>
    </main>
  );
}