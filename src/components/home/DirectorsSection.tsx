'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const modernEase = [0.16, 1, 0.3, 1];

export default function DirectorsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transitions
  const imgParallax = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const textParallax = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#FAFAFA] text-[#0F2517] py-20 md:py-32 lg:py-40 overflow-hidden border-t border-[#0F2517]/5"
    >
      <div className="absolute inset-0 modern-texture z-0 pointer-events-none" />
      
      {/* Decorative Dot Grid background */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
        style={{ backgroundImage: 'radial-gradient(#0F2517 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* ── LEFT COLUMN: Image Presentation ── */}
          <div className="col-span-1 lg:col-span-5 relative w-full flex justify-center">
            
            {/* Soft background shape */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#7A9C7E]/10 rounded-full blur-2xl pointer-events-none z-0" />
            
            {/* Image Frame with reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.5, ease: modernEase }}
              className="w-full max-w-[420px] aspect-[3/4] relative overflow-hidden rounded-[32px] md:rounded-[40px] shadow-[0_30px_80px_rgba(15,37,23,0.08)] border border-white/60 z-10"
            >
              <motion.div 
                style={{ y: imgParallax }}
                className="absolute inset-0 w-full h-[120%] top-[-10%]"
              >
                <img 
                  src="/shefin.png" 
                  alt="Ar. Shefin Yoosaf T - Principal Architect" 
                  className="w-full h-full object-cover grayscale-[15%] contrast-[105%]"
                />
              </motion.div>
              
              {/* passepartout elegant line */}
              <div className="absolute inset-4 border border-white/40 rounded-[20px] md:rounded-[28px] pointer-events-none z-20" />
              
              {/* Soft overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2517]/20 via-transparent to-transparent pointer-events-none z-10" />
            </motion.div>

            {/* Micro Badge floating underneath */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: modernEase }}
              className="absolute bottom-6 -left-2 md:-left-8 bg-white/95 backdrop-blur-md px-6 py-4 rounded-[20px] shadow-[0_15px_40px_rgba(15,37,23,0.06)] border border-white/50 z-20 flex items-center gap-3.5"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#7A9C7E] animate-pulse" />
              <div>
                <p className="font-sans text-[10px] tracking-[0.1em] font-semibold text-[#0F2517]/40 uppercase leading-none mb-1">Status</p>
                <p className="font-serif text-sm italic text-[#0F2517] leading-none">Principal Architect</p>
              </div>
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN: Content block ── */}
          <motion.div 
            style={{ y: textParallax }}
            className="col-span-1 lg:col-span-7 flex flex-col items-start"
          >
            {/* Section Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: modernEase }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#7A9C7E] font-bold">
                The Leadership
              </span>
              <div className="w-10 h-[1px] bg-[#7A9C7E]" />
            </motion.div>

            {/* Name and Designation */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.1, ease: modernEase }}
              className="font-serif text-[42px] md:text-[56px] leading-[1.1] font-light text-[#0F2517] tracking-tight mb-3"
            >
              Ar. Shefin Yoosaf T
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: modernEase }}
              className="font-sans text-xs md:text-sm tracking-[0.15em] uppercase font-medium text-[#7A9C7E] mb-8"
            >
              Principal Architect | Town Planner (A)
            </motion.p>

            {/* Detailed Quote / Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: modernEase }}
              className="font-sans text-[14px] md:text-[16px] leading-[1.9] text-[#0F2517]/70 font-light max-w-[580px] flex flex-col gap-6 mb-10 border-l border-[#7A9C7E]/20 pl-6"
            >
              <p>
                Leading Y Architects with a contextual, functional, and climate-responsive design methodology. Bringing over a decade of mastery in sculpting spaces that respect Kerala's unique tropical ecology.
              </p>
              <p className="italic text-[#0F2517]/50 font-serif text-[15px] md:text-[17px] leading-relaxed">
                "We do not merely construct buildings. We sculpt environments from raw materials, crafting enduring spaces that breathe with the tropical ecology."
              </p>
            </motion.div>

            {/* Interactive Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: modernEase }}
            >
              <Link 
                href="/about#directors" 
                className="group flex items-center justify-between gap-8 bg-white border border-[#0F2517]/10 hover:border-[#7A9C7E]/50 hover:shadow-[0_10px_30px_rgba(122,156,126,0.12)] transition-all duration-500 px-7 py-3.5 rounded-full"
              >
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0F2517] font-semibold group-hover:text-[#7A9C7E] transition-colors duration-500">
                  Explore full background
                </span>
                <div className="w-10 h-10 rounded-full bg-[#0F2517]/5 flex items-center justify-center group-hover:bg-[#7A9C7E] transition-colors duration-500">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#0F2517] group-hover:text-white transition-colors duration-500">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
