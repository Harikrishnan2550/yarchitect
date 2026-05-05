'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const springTransition = { type: 'spring', damping: 25, stiffness: 120 };

/* ─── Premium Magnetic Button ────────────────── */
function MagneticButton({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.4);
    y.set((e.clientY - r.top - r.height / 2) * 0.4);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div style={{ x: sx, y: sy }} className="relative z-20 w-fit mt-6">
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative flex items-center justify-between gap-6 bg-[#7A9C7E] hover:bg-[#6b8b6f] shadow-[0_8px_30px_rgba(122,156,126,0.25)] hover:shadow-[0_20px_40px_rgba(122,156,126,0.4)] transition-all duration-500 px-8 py-4 rounded-full border border-[#7A9C7E]/50"
      >
        <span className="relative z-10 font-sans text-[11px] tracking-[0.2em] uppercase font-semibold text-white transition-colors duration-500">
          {label}
        </span>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-inner group-hover:bg-white group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-500 transform group-hover:scale-110">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:text-[#7A9C7E] transition-colors duration-500">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Content Data ─────────────────────────────────────────────────── */
const distinctions = [
  {
    num: "01",
    title: "Climatic Synergy",
    desc: "Rooted in Kerala's tropical ecology, our designs harness the monsoon rain and equatorial sun. We create deeply breathable spaces that cool naturally and require minimal artificial intervention."
  },
  {
    num: "02",
    title: "Material Honesty",
    desc: "We celebrate the raw integrity of exposed laterite, warm wood, brass, and red oxide. We select materials that age gracefully, allowing the architecture to develop a rich patina over time."
  },
  {
    num: "03",
    title: "Holistic Integration",
    desc: "From the sweeping master plan to the finest interior joinery and landscape flora, every single element is meticulously orchestrated under one unified architectural vision."
  },
  {
    num: "04",
    title: "Enduring Precision",
    desc: "With 15+ years of mastery, we balance the ancient wisdom of Vastu principles with cutting-edge structural engineering to build sanctuaries that stand the test of generations."
  }
];

/* ─── Why Choose Us Section ────────────────────────────────────────── */
export default function WhyChooseUs() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative w-full py-12 lg:py-24 px-4 md:px-8 bg-white overflow-hidden">
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

      {/* Main Soft Container */}
      <div className="bg-gradient-to-br from-[#E8EFEA] via-[#F4F7F5] to-[#DFEBE1] rounded-[48px] lg:rounded-[80px] py-20 lg:py-32 px-6 md:px-12 relative w-full overflow-hidden shadow-[0_20px_80px_rgba(15,37,23,0.06)] border border-[#0F2517]/[0.04] max-w-[1400px] mx-auto">
        
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 modern-texture rounded-[48px] lg:rounded-[80px]" />
        
        {/* Soft Organic Blob Background Accents */}
        <motion.div 
          animate={{ 
            y: [0, -60, 0],
            x: [0, 40, 0],
            scale: [1, 1.25, 1],
            rotate: [0, 15, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%] rounded-full bg-[#7A9C7E]/[0.25] blur-[120px] pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            y: [0, 60, 0],
            x: [0, -50, 0],
            scale: [1, 1.3, 1],
            rotate: [0, -15, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[70%] rounded-full bg-[#0F2517]/[0.12] blur-[120px] pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            y: [0, -40, 0],
            x: [0, 60, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full bg-[#7A9C7E]/[0.15] blur-[100px] pointer-events-none" 
        />

        <div className="max-w-[1200px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          
          {/* ── LEFT COLUMN (Sticky Header) ── */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 flex flex-col items-start gap-8">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={springTransition}
                className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-full shadow-sm border border-[#0F2517]/[0.03]"
              >
                <span className="w-2 h-2 rounded-full bg-[#7A9C7E]" />
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0F2517]/80 font-medium">
                  Our Distinction
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ ...springTransition, delay: 0.1 }}
                className="font-serif text-[48px] md:text-[64px] font-light leading-[1.05] tracking-tight text-[#0F2517]"
              >
                Why build <br className="hidden md:block" />
                your <span className="text-[#7A9C7E] font-medium">sanctuary</span> <br className="hidden md:block" />
                with <span className="italic text-[#7A9C7E]">Y Architects?</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ ...springTransition, delay: 0.2 }}
                className="font-sans text-[15px] font-light leading-[2.1] text-[#0F2517]/70 max-w-[400px]"
              >
                We do not mass-produce buildings. We limit our studio intake to ensure that every project receives the uncompromising dedication of our principal directors.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ ...springTransition, delay: 0.3 }}
              >
                <MagneticButton href="/contact" label="Start a Conversation" />
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT COLUMN (Soft Floating Cards) ── */}
          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
            {distinctions.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ ...springTransition, delay: idx * 0.1 }}
                className="group relative bg-white p-8 md:p-10 rounded-[40px] shadow-[0_10px_40px_rgba(15,37,23,0.03)] hover:shadow-[0_20px_60px_rgba(122,156,126,0.15)] flex flex-col md:flex-row gap-6 md:gap-8 items-start overflow-hidden border border-[#0F2517]/[0.02] hover:border-[#7A9C7E]/30 transition-all duration-700"
              >
                {/* Soft Background Highlight on Hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-[#7A9C7E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                />

                {/* Pill-shaped Number Indicator */}
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                  className="flex-shrink-0 relative z-10"
                >
                  <div className="w-14 h-14 rounded-full bg-white group-hover:bg-[#7A9C7E]/15 flex items-center justify-center shadow-inner transition-all duration-500 border border-[#0F2517]/[0.04] group-hover:border-[#7A9C7E]/30 group-hover:scale-110">
                    <span className="font-serif text-xl italic text-[#0F2517]/50 group-hover:text-[#0F2517] transition-colors duration-500">
                      {item.num}
                    </span>
                  </div>
                </motion.div>

                {/* Content Block */}
                <div className="flex flex-col relative w-full z-10">
                  <h3 className="font-serif text-[26px] md:text-3xl font-medium text-[#0F2517] mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[14px] md:text-[15px] font-light leading-[1.9] text-[#0F2517]/70 max-w-lg">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}