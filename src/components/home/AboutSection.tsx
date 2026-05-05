'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const modernEase = [0.16, 1, 0.3, 1];

export default function AboutSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects for depth
  const imgParallax = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const cardParallax = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#FAFAFA] text-[#0F2517] selection:bg-[#7A9C7E] selection:text-white pt-24 pb-24 md:pt-32 md:pb-48 lg:pt-40 lg:pb-64 overflow-hidden">
      {/* Texture Background */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        
        .modern-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          mix-blend-mode: multiply;
          pointer-events: none;
        }
      `}</style>
      <div className="absolute inset-0 modern-texture z-0 pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col items-center">
        
        {/* Header Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: modernEase }}
          className="flex items-center gap-4 mb-6 md:mb-8"
        >
          <div className="w-8 md:w-12 h-[1px] bg-[#0F2517]/20" />
          <span className="font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#0F2517]/60 font-medium">
            Studio Ethos
          </span>
          <div className="w-8 md:w-12 h-[1px] bg-[#0F2517]/20" />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, delay: 0.1, ease: modernEase }}
          className="font-serif text-[40px] leading-[1.1] md:text-[64px] lg:text-[80px] md:leading-[1.05] text-center text-[#0F2517] font-light tracking-tight max-w-[900px] mb-12 md:mb-24"
        >
          Spaces that <span className="italic text-[#7A9C7E]">breathe</span> <br className="hidden md:block" />
          with their environment.
        </motion.h2>

        {/* Singular Massive Immersive Image */}
        <div className="w-full relative flex flex-col">
          
          {/* Main Image Frame with Expanding Reveal */}
          <motion.div
            initial={{ clipPath: 'inset(15% 5% 15% 5%)', borderRadius: "60px" }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', borderRadius: "32px" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 2, ease: modernEase }}
            className="w-full aspect-[4/5] sm:aspect-square md:aspect-[4/3] lg:aspect-[21/10] relative bg-[#0F2517]/5 overflow-hidden shadow-[0_40px_100px_rgba(15,37,23,0.08)] border border-white/60 z-10"
          >
            <motion.div 
              style={{ y: imgParallax }}
              className="absolute inset-0 w-full h-[120%] top-[-10%]"
            >
              <img src="/img1.png" alt="Main Architecture" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>

          {/* Floating Text Card (Relative on Mobile, Absolute on Desktop) */}
          <motion.div
            style={{ y: cardParallax }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, delay: 0.3, ease: modernEase }}
            className="w-[92%] sm:w-[80%] md:w-[600px] relative md:absolute -mt-16 md:mt-0 md:-bottom-24 lg:-bottom-32 self-center md:self-auto md:left-8 lg:left-12 bg-white/85 backdrop-blur-xl p-8 md:p-12 rounded-[24px] md:rounded-[32px] shadow-[0_30px_80px_rgba(15,37,23,0.1)] border border-white z-30"
          >
            <div className="font-sans text-[13px] md:text-[15px] leading-[2.1] text-[#0F2517]/80 font-light flex flex-col gap-6">
              <p>
                Based in the lush landscapes of Kerala, Y Architects operates at the intersection of geometry and vibrant ecology. We do not just build structures; we orchestrate environments.
              </p>
              <p>
                From expansive master planning to the most intimate interior details, our holistic approach ensures every material chosen serves a unified, enduring vision.
              </p>
            </div>

            {/* Modern Interactive Button */}
            <Link href="/team" className="group flex items-center justify-between mt-8 md:mt-10 w-full md:w-fit gap-8 bg-[#FAFAFA] border border-[#0F2517]/10 hover:border-[#7A9C7E]/50 hover:shadow-[0_10px_30px_rgba(122,156,126,0.15)] transition-all duration-500 px-6 py-3 rounded-[24px]">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0F2517] font-semibold group-hover:text-[#7A9C7E] transition-colors duration-500">
                Meet The Directors
              </span>
              <div className="w-10 h-10 rounded-full bg-[#0F2517]/5 flex items-center justify-center group-hover:bg-[#7A9C7E]/10 transition-colors duration-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#0F2517] group-hover:text-[#7A9C7E] transition-colors duration-500">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          </motion.div>

          {/* Overlapping Badge (Top Right) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute -top-6 -right-2 md:-top-12 md:-right-12 bg-[#0F2517] text-white w-28 h-28 md:w-40 md:h-40 rounded-full flex flex-col items-center justify-center shadow-2xl z-40 border-[4px] md:border-[6px] border-[#FAFAFA]"
          >
            <p className="font-serif text-3xl md:text-5xl font-light leading-none mb-1">15<span className="text-[#7A9C7E]">+</span></p>
            <p className="font-sans text-[6px] md:text-[8px] tracking-[0.2em] uppercase text-white/70">Years</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}