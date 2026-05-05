'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const premiumEase = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: premiumEase } 
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

/* ─── Refined Premium Button ────────────────────────────────── */
function PremiumButton({ href, label }: { href: string; label: string }) {
  return (
    <Link 
      href={href} 
      className="group relative flex items-center gap-6 pb-4 border-b border-forest/10 hover:border-sage transition-colors duration-500"
    >
      <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-forest font-semibold transition-colors duration-500 group-hover:text-sage">
        {label}
      </span>
      <div className="overflow-hidden flex items-center justify-center">
        <svg 
          width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
          className="text-forest group-hover:text-sage transform transition-transform duration-500 group-hover:translate-x-1"
        >
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Link>
  );
}

export default function ServicesTeaser() {
  const services = [
    { 
      num: "01",
      title: "Architecture & Planning", 
      desc: "Orchestrating large-scale visions and structural frameworks that define how people live and move through space." 
    },
    { 
      num: "02",
      title: "Interior Design", 
      desc: "Crafting intimate, tactile environments with raw materials, warm brass, and rich textures that elevate daily rituals." 
    },
    { 
      num: "03",
      title: "Landscape & Ecology", 
      desc: "Integrating climate-responsive flora and natural light to ensure structures breathe seamlessly with the tropical environment." 
    }
  ];

  return (
    <section className="relative py-32 md:py-48 px-6 md:px-12 w-full bg-cream overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* ── HEADER ────────────────────────────────────────────────── */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} 
          variants={staggerContainer} 
          className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-20 md:mb-32 gap-12"
        >
          <div className="flex flex-col">
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-sage" />
              <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-forest/50 font-semibold">
                Technical Disciplines
              </span>
            </motion.div>
            
            <motion.h2 variants={fadeUp} className="font-serif text-[56px] md:text-[90px] lg:text-[110px] font-light text-forest leading-[0.9] tracking-tighter">
              The Geometry <br className="hidden md:block" />
              <span className="italic text-sage">of Intent.</span>
            </motion.h2>
          </div>

          <motion.div variants={fadeUp} className="hidden lg:block pb-4">
            <PremiumButton href="/services" label="Explore Expertise" />
          </motion.div>
        </motion.div>

        {/* ── SOFT TOUCH SERVICES GRID ───────────────────────────────── */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
        >
          {services.map((service, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeUp}
              className="group relative flex flex-col bg-white p-10 md:p-12 lg:p-14 rounded-3xl shadow-[0_10px_40px_rgba(15,37,23,0.03)] hover:shadow-[0_30px_70px_rgba(15,37,23,0.08)] transition-all duration-700 overflow-hidden min-h-[420px] justify-between border border-forest/5"
            >
              {/* Massive Sheer Watermark Number */}
              <div className="absolute -top-10 -right-10 font-serif text-[180px] font-light italic text-forest/5 group-hover:text-sage/10 group-hover:-translate-y-4 group-hover:-translate-x-4 transition-all duration-700 pointer-events-none select-none">
                {service.num}
              </div>

              {/* Top Section */}
              <div className="relative z-10">
                <span className="font-sans text-[10px] tracking-[0.3em] text-forest/40 font-medium block mb-8 transition-colors duration-500 group-hover:text-sage">
                  {service.num} //
                </span>
                <h3 className="font-serif text-3xl md:text-4xl font-light text-forest mb-6 tracking-tight leading-snug">
                  {service.title}
                </h3>
              </div>

              {/* Bottom Section */}
              <div className="relative z-10 flex flex-col gap-8">
                <p className="font-sans text-[13px] lg:text-[14px] text-forest/60 font-light leading-[1.9] tracking-[0.02em] max-w-[300px]">
                  {service.desc}
                </p>

                {/* Animated Arrow Indicator */}
                <div className="flex items-center gap-4 overflow-hidden pt-5 border-t border-forest/10 group-hover:border-sage/30 transition-colors duration-500">
                  <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-forest/40 group-hover:text-sage transition-colors duration-500">
                    Specification
                  </span>
                  <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
                    <svg 
                      width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                      className="absolute text-sage -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
                    >
                       <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── MOBILE BUTTON ─────────────────────────────────────────── */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} 
          variants={fadeUp} 
          className="mt-16 flex justify-center lg:hidden"
        >
          <PremiumButton href="/services" label="Explore Expertise" />
        </motion.div>
      </div>
    </section>
  );
}