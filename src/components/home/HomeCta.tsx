'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

// Using your established premium ease
const premiumEase = [0.16, 1, 0.3, 1];

/* ─── Premium Magnetic Button ────────────────────────────── */
function MagneticButton({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.4);
    y.set((e.clientY - r.top - r.height / 2) * 0.4);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div style={{ x: sx, y: sy }} className="relative z-20 w-fit mx-auto mt-12">
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative flex items-center gap-6 px-10 py-5 rounded-full border border-[#0F2517]/10 overflow-hidden bg-white shadow-[0_10px_40px_rgba(15,37,23,0.05)] transition-all duration-500 hover:border-[#7A9C7E]/50"
      >
        <span className="relative z-10 font-sans text-[11px] tracking-[0.3em] uppercase font-bold text-[#0F2517] transition-colors duration-500 group-hover:text-[#7A9C7E]">
          {label}
        </span>
        <div className="w-10 h-10 rounded-full bg-[#0F2517] flex items-center justify-center transition-all duration-500 group-hover:bg-[#7A9C7E] group-hover:rotate-45">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}

export default function HomeCta() {
  return (
    <section className="w-full py-40 md:py-64 px-6 bg-[#FAFAFA] flex flex-col items-center justify-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
      `}</style>

      {/* ── Main Content ── */}
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Architectural Metadata Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: premiumEase }}
          className="mb-12 flex items-center gap-3 bg-white border border-[#0F2517]/5 px-4 py-1.5 rounded-full shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#7A9C7E] animate-pulse" />
          <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#0F2517]/50 font-semibold">
            Status: Accepting Projects
          </span>
        </motion.div>

        {/* Staggered Title Reveal */}
        <div className="flex flex-col items-center mb-10">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: premiumEase }}
              className="font-serif text-[60px] md:text-[110px] lg:text-[140px] font-light leading-[0.95] text-[#0F2517] tracking-tighter"
            >
              Let&apos;s craft
            </motion.h2>
          </div>
          <div className="overflow-hidden mt-2">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.1, ease: premiumEase }}
              className="font-serif text-[60px] md:text-[110px] lg:text-[140px] font-light italic text-[#7A9C7E] tracking-tighter"
            >
              your retreat.
            </motion.h2>
          </div>
        </div>

        {/* Enhanced Body Text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: premiumEase }}
          className="font-sans text-[15px] md:text-[18px] font-light leading-[2] text-[#0F2517]/60 max-w-xl mx-auto px-4"
        >
          We believe the finest architecture is a dialogue between human life and the natural world. Reach out to begin the conversation about your future sanctuary.
        </motion.p>

        {/* Upgraded CTA Interaction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6, ease: premiumEase }}
        >
          <MagneticButton href="/contact" label="Initiate Project" />
        </motion.div>

        {/* Bottom Coordinates */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          className="mt-24 md:mt-32 border-t border-[#0F2517]/10 pt-8 w-full max-w-xs"
        >
          <p className="font-sans text-[8px] tracking-[0.5em] uppercase text-[#0F2517]">
            Kerala — Bangalore — Dubai
          </p>
        </motion.div>
      </div>
    </section>
  );
}