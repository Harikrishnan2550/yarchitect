'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

/* ─── Premium Modern Button (Matched to AboutSection) ────────────────── */
function PremiumButton({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group flex items-center justify-between w-fit gap-8 bg-white border border-[#0F2517]/10 hover:border-[#7A9C7E]/50 hover:shadow-[0_10px_30px_rgba(122,156,126,0.15)] transition-all duration-500 px-6 py-3 rounded-[24px]">
      <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0F2517] font-semibold transition-colors duration-500">
        {label}
      </span>
      <div className="w-10 h-10 rounded-full bg-[#0F2517]/5 flex items-center justify-center group-hover:bg-[#7A9C7E] transition-colors duration-500">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#0F2517] group-hover:text-white transition-colors duration-500">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Link>
  );
}

import { projectsData } from '@/data/projects';

export default function GalleryTeaser() {
  const featuredProjects = projectsData.slice(0, 4);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // FIXED: Using calc() ensures the scroll perfectly ends at the right edge of the screen
  const scrollX = useTransform(scrollYProgress, [0, 1], ["calc(0% - 0vw)", "calc(-100% + 100vw)"]);
  
  // Maps vertical scroll to image parallax translation
  const imageParallax = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#FAFAFA] z-20 overflow-visible">
      
      {/* Texture Background */}
      <style>{`
        .modern-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          mix-blend-mode: multiply;
          pointer-events: none;
        }
      `}</style>
      
      {/* Sticky Scroll Container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-start pt-16 md:items-center md:pt-0">
        <div className="absolute inset-0 modern-texture z-0" />

        {/* Architectural Dot Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
          style={{ backgroundImage: 'radial-gradient(#0F2517 1px, transparent 1px)', backgroundSize: '48px 48px' }} 
        />

        {/* Edge Technical Typography */}
        <div className="absolute top-1/2 right-[-60px] -rotate-90 hidden lg:flex items-center gap-4 opacity-30 z-20 pointer-events-none">
          <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-[#0F2517] whitespace-nowrap">
            Coordinates: 10.8505° N, 76.2711° E
          </span>
          <div className="w-12 h-[1px] bg-[#0F2517]" />
        </div>

        {/* Scroll Progress Line */}
        <div className="absolute bottom-12 left-[10%] md:left-[15%] w-32 md:w-48 h-[2px] bg-[#0F2517]/10 z-20 rounded-full overflow-hidden">
          <motion.div 
            style={{ scaleX: scrollYProgress, transformOrigin: 'left' }} 
            className="h-full bg-[#0F2517] rounded-full" 
          />
        </div>

        {/* Scrolling Content Layer */}
        <div className="relative z-10 w-full flex items-center">
          {/* FIXED: Added 'w-max' so the container properly measures its total width, and adjusted 'pr' so there is a clean gap at the end */}
          <motion.div style={{ x: scrollX }} className="flex w-max gap-16 md:gap-32 pl-[10%] md:pl-[15%] pr-[10vw] md:pr-[15vw] items-center">
            
            {/* Introductory Title Block */}
            <div className="min-w-[80vw] md:min-w-[35vw] flex flex-col justify-center shrink-0">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 md:w-12 h-[1px] bg-[#7A9C7E]" />
                <span className="font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#7A9C7E] font-medium">
                  Selected Works
                </span>
                <div className="w-8 md:w-12 h-[1px] bg-[#7A9C7E]" />
              </div>
              <h2 className="font-serif text-5xl md:text-[90px] font-light text-[#0F2517] leading-[1.05] tracking-tight mb-12">
                Design <br />
                <span className="italic text-transparent" style={{ WebkitTextStroke: '1.5px #0F2517' }}>Gallery.</span>
              </h2>
              <PremiumButton href="/gallery" label="Explore Portfolio" />
            </div>

            {/* Horizontal Exhibition Cards */}
            {featuredProjects.map((project, idx) => (
              <div key={project.id} className="min-w-[85vw] md:min-w-[45vw] flex flex-col group cursor-pointer shrink-0 relative">
                <Link href={`/gallery/${project.id}`} className="flex flex-col w-full h-[65vh] md:h-[75vh] mt-8 md:mt-0 gap-6">
                  
                  {/* Image Window */}
                  <div className="w-full flex-1 overflow-hidden relative rounded-[40px] md:rounded-[60px] shadow-[0_30px_80px_rgba(15,37,23,0.08)] group-hover:shadow-[0_40px_100px_rgba(15,37,23,0.15)] transition-all duration-700 border border-white/60">
                    <motion.div style={{ x: imageParallax }} className="absolute top-0 bottom-0 left-[-20%] right-[-20%] w-[140%] h-full">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1]"
                      />
                    </motion.div>
                    
                    {/* Inner Passepartout Border for Editorial Look */}
                    <div className="absolute inset-4 md:inset-6 border-[0.5px] border-white/50 rounded-[24px] md:rounded-[40px] pointer-events-none z-10" />

                    {/* Hover Soft Overlay */}
                    <div className="absolute inset-0 bg-[#0F2517]/0 group-hover:bg-[#0F2517]/10 transition-colors duration-700 pointer-events-none" />
                  </div>

                  {/* Centered Metadata Details Below Image */}
                  <div className="flex flex-col items-center text-center px-4">
                    {/* Category & Year */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-serif text-[#7A9C7E] italic text-sm md:text-base">
                        0{idx + 1}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7A9C7E]/30" />
                      <p className="font-sans text-[#0F2517]/60 text-[9px] tracking-[0.25em] uppercase font-bold">
                        {project.category}
                      </p>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7A9C7E]/30" />
                      <p className="font-sans text-[#0F2517]/40 text-[9px] tracking-[0.2em] uppercase">
                        {project.year}
                      </p>
                    </div>

                    {/* Project Title */}
                    <h3 className="font-serif text-2xl md:text-3xl text-[#0F2517] group-hover:text-[#7A9C7E] transition-colors duration-500 tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}