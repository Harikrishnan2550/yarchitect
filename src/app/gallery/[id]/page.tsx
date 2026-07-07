'use client';

import { use, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { projectsData } from '@/data/projects';

// Premium architectural easing curve
const premiumEase = [0.16, 1, 0.3, 1];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: premiumEase } 
  }
};

const sideReveal = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 1.2, ease: premiumEase } 
  }
};

const sideRevealRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 1.2, ease: premiumEase } 
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const clipReveal = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: { 
    clipPath: 'inset(0% 0 0 0)', 
    transition: { duration: 1.6, ease: premiumEase } 
  }
};

const drawLine = {
  hidden: { scaleX: 0 },
  visible: { 
    scaleX: 1, 
    transition: { duration: 1.5, ease: premiumEase } 
  }
};

// Subtle Film Grain texture overlay
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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { id } = use(params);
  
  // Find project in the database
  const projectIdx = projectsData.findIndex(p => p.id === id);
  const project = projectsData[projectIdx];

  // If project doesn't exist, show a clean message
  if (!project) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center text-center p-6 text-forest">
        <FilmGrain />
        <h1 className="font-serif text-4xl mb-4">Project Not Found</h1>
        <p className="font-sans text-xs tracking-widest uppercase opacity-60 mb-8">The requested portfolio work does not exist.</p>
        <Link href="/gallery" className="font-sans text-xs tracking-[0.2em] uppercase font-bold border border-forest/20 px-6 py-3 rounded-full hover:bg-forest hover:text-cream transition-colors duration-500">
          ← Back to Portfolio
        </Link>
      </div>
    );
  }

  // Next Project logic for continuous scroll navigation
  const nextProject = projectsData[(projectIdx + 1) % projectsData.length];

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scrolling indicators
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Parallax calculations for the hero cover image
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroParallax = useTransform(heroScrollProgress, [0, 1], ["0%", "20%"]);

  return (
    <main className="min-h-screen bg-cream text-forest selection:bg-sage selection:text-white overflow-x-hidden relative" ref={containerRef}>
      <FilmGrain />
      
      {/* Top Reading Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-sage origin-left z-[100]" style={{ scaleX }} />

      {/* ── 1. HEADER SECTION (Breadcrumbs & Dynamic Title) ── */}
      <header className="pt-32 md:pt-44 pb-12 px-6 md:px-[8%] max-w-[1400px] mx-auto z-10 relative">
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          animate="visible" 
          className="flex flex-col items-start"
        >
          {/* Back to Gallery navigation */}
          <motion.div variants={sideReveal} className="mb-8 md:mb-10">
            <Link href="/gallery" className="group inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.3em] uppercase text-forest/50 hover:text-sage transition-colors duration-300">
              <span className="group-hover:-translate-x-1.5 transition-transform duration-300">←</span> Back to Exhibition
            </Link>
          </motion.div>



          {/* Dynamic Page Header */}
          <div className="overflow-hidden mb-6">
            <motion.h1 
              variants={sideReveal} 
              className="font-serif text-[11vw] md:text-[76px] lg:text-[96px] font-light leading-[1.05] tracking-tighter"
            >
              {project.title}
            </motion.h1>
          </div>

          <motion.div variants={sideReveal} className="w-full h-[1px] bg-forest/10 mt-4" />
        </motion.div>
      </header>

      {/* ── 2. FULL-BLEED HERO EXHIBITION ── */}
      <section ref={heroRef} className="w-full px-6 md:px-[8%] max-w-[1600px] mx-auto relative h-[60vh] md:h-[80vh] overflow-hidden">
        <motion.div 
          variants={clipReveal}
          initial="hidden"
          animate="visible"
          className="w-full h-full relative rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/40"
        >
          <motion.div 
            style={{ y: heroParallax }} 
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover grayscale-[10%]" 
            />
          </motion.div>
          
          {/* Inner border line detailing */}
          <div className="absolute inset-4 md:inset-6 border border-white/20 rounded-[12px] md:rounded-[1.8rem] pointer-events-none z-15" />
          {/* Dark luxury overlay vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest/30 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </section>

      {/* ── 3. SPECIFICATION & EDITORIAL BODY ── */}
      <section className="py-16 md:py-28 px-6 md:px-[8%] max-w-[1400px] mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Blueprint specifications */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-10%" }}
            variants={staggerContainer}
            className="col-span-1 lg:col-span-4 bg-white/40 backdrop-blur-md p-8 rounded-2xl md:rounded-3xl border border-forest/[0.04] shadow-lg sticky top-28"
          >
            <motion.h3 
              variants={fadeUp} 
              className="font-sans text-sage text-[10px] tracking-[0.3em] uppercase font-bold mb-6 flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 bg-sage rotate-45" /> Project Blueprint
            </motion.h3>
            
            <div className="flex flex-col gap-5 w-full">
              {[
                { label: "Client", value: project.specs.client },
                { label: "Architect", value: project.specs.architect },
                { label: "Area / Size", value: project.specs.area },
                { label: "Location", value: project.location },
                { label: "Completion", value: project.year },
                { label: "Status", value: project.specs.status }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeUp}
                  className="flex justify-between py-3 border-b border-forest/10 last:border-0"
                >
                  <span className="font-sans text-[10px] tracking-widest text-forest/40 uppercase font-semibold">{item.label}</span>
                  <span className="font-serif text-sm text-forest">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Editorial narrative description */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-10%" }}
            variants={staggerContainer}
            className="col-span-1 lg:col-span-8 flex flex-col items-start pr-0 lg:pr-8"
          >
            <motion.span variants={fadeUp} className="font-sans text-[9px] tracking-[0.3em] uppercase text-sage font-bold mb-4">
              Overview
            </motion.span>
            
            <motion.p 
              variants={fadeUp} 
              className="font-serif text-2xl md:text-3xl leading-relaxed text-forest font-light tracking-tight mb-8"
            >
              {project.description}
            </motion.p>
            
            {project.extendedDescription && (
              <motion.div 
                variants={fadeUp} 
                className="font-sans font-light text-[15px] md:text-[16px] leading-[1.9] text-forest/70 flex flex-col gap-6"
              >
                <p>{project.extendedDescription}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── 4. DETAILED PHOTOGRAPHY GALLERY ── */}
      <section className="py-12 md:py-20 bg-white/20 border-t border-forest/5 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-[8%]">
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={staggerContainer}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4"
          >
            <div>
              <motion.p variants={sideReveal} className="font-sans text-sage text-[9px] tracking-[0.3em] uppercase font-bold mb-3">Exhibition</motion.p>
              <motion.h2 variants={sideReveal} className="font-serif text-3xl md:text-5xl text-forest font-light tracking-tight">Detail Frames.</motion.h2>
            </div>
            <motion.p variants={sideReveal} className="font-sans font-light text-[13px] leading-[1.6] text-forest/50 max-w-[280px]">
              Capturing structural geometry, textures, and the play of light.
            </motion.p>
          </motion.div>

          {/* Masonry / Structured gallery columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {project.gallery.map((imgUrl, index) => (
              <motion.div 
                key={index} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={index % 2 === 0 ? sideReveal : sideRevealRight}
                className={`w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-forest/5 shadow-md relative group ${
                  index % 3 === 0 ? 'aspect-[4/3] md:col-span-2' : 'aspect-square'
                }`}
              >
                <img 
                  src={imgUrl} 
                  alt={`${project.title} detail frame ${index + 1}`} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-1000 ease-out" 
                />
                <div className="absolute inset-0 bg-forest/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-4 md:inset-6 border border-white/20 rounded-[12px] md:rounded-[1.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CONTINUOUS SCROLL: NEXT PROJECT CALL-TO-ACTION ── */}
      <section className="relative py-16 md:py-24 text-center bg-forest text-cream overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl mt-16 mb-12 mx-4 md:mx-[8%] max-w-[1400px] xl:mx-auto">
        {/* Soft decorative visual cues */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
          style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        
        <div className="flex flex-col items-center px-6 w-full relative z-10 max-w-4xl mx-auto">
          <motion.span 
            initial="hidden" 
            whileInView="visible" 
            variants={fadeUp} 
            className="font-sans text-[10px] tracking-[0.4em] uppercase text-sage mb-6 font-bold flex items-center gap-4"
          >
            <span className="w-8 h-[1px] bg-sage" />
            Next Exhibition
            <span className="w-8 h-[1px] bg-sage" />
          </motion.span>
          
          <Link href={`/gallery/${nextProject.id}`} className="group inline-block">
            <motion.span 
              initial="hidden" 
              whileInView="visible" 
              variants={fadeUp} 
              className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-light text-cream/50 mb-2 block"
            >
              Explore {nextProject.category}
            </motion.span>
            
            <motion.h2 
              initial="hidden" 
              whileInView="visible" 
              variants={sideReveal} 
              className="font-serif text-[8vw] md:text-[72px] lg:text-[88px] font-light text-cream tracking-tighter leading-tight"
            >
              {nextProject.title} <span className="italic text-sage group-hover:text-cream transition-colors duration-700">⟶</span>
            </motion.h2>
          </Link>
        </div>
      </section>

    </main>
  );
}
