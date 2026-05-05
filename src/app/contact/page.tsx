'use client';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

// Ultra-smooth, luxurious easing curve
const premiumEase = [0.16, 1, 0.3, 1];

// ─── ANIMATION VARIANTS ────────────────────────────────────

const sideReveal = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: premiumEase } }
};

const sideRevealRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: premiumEase } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: premiumEase } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const drawLine = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.5, ease: premiumEase } }
};

const maskReveal = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1.2, ease: premiumEase } }
};

const clipReveal = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: { clipPath: 'inset(0% 0 0 0)', transition: { duration: 1.5, ease: premiumEase } }
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

// Helper for Staggered Word Reveals
const AnimatedTitle = ({ text, className }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className={`flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <div key={index} className="overflow-hidden mr-[0.25em] mb-[-0.1em]">
          <motion.span variants={maskReveal} className="inline-block">
            {word}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
};

export default function ContactPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20, restDelta: 0.001 });

  return (
    <main className="min-h-screen bg-cream relative overflow-hidden text-forest pt-24 md:pt-40 pb-16 selection:bg-sage selection:text-white" ref={containerRef}>
      
      <FilmGrain />
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-sage origin-left z-[100]" style={{ scaleX: smoothProgress }} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-[8%] relative z-10">
        
        {/* ── HEADER ── */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col items-start mb-10 md:mb-16">
          <motion.div variants={sideReveal} className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            <p className="font-sans text-forest/50 tracking-[0.3em] text-[9px] md:text-[10px] uppercase font-bold">
              Inquiries // Communication
            </p>
          </motion.div>

          <div className="flex flex-col gap-1">
            <AnimatedTitle text="Let's discuss" className="font-serif text-[12vw] md:text-[10vw] lg:text-[120px] font-light leading-[1] tracking-tighter" />
            <div className="lg:pl-16">
              <AnimatedTitle text="your vision." className="font-serif text-[12vw] md:text-[10vw] lg:text-[120px] font-light leading-[1] tracking-tighter italic text-sage" />
            </div>
          </div>
        </motion.div>

        {/* ── CONTACT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start pt-12 md:pt-20 relative">
          
          {/* Animated Line Divider */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={drawLine} className="absolute top-0 left-0 w-full h-[1px] bg-forest/10 origin-left" />

          {/* Left Column: Studio Info */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={staggerContainer}
            className="lg:col-span-5 flex flex-col"
          >
            <motion.p variants={sideReveal} className="font-sans font-light text-[14px] md:text-[16px] leading-[1.8] text-forest/70 max-w-[440px] mb-12 md:mb-16 border-l border-sage/30 pl-5">
              Whether you are looking to commission a master-planned township, a commercial complex, or a private residence, our directors are ready to listen.
            </motion.p>
            
            <div className="flex flex-col gap-10 md:gap-14">
              <motion.div variants={sideReveal} className="group cursor-default">
                <p className="font-sans text-sage text-[9px] tracking-[0.3em] uppercase font-bold mb-3 flex items-center gap-3">
                  <span className="w-4 h-[1px] bg-sage group-hover:w-8 transition-all duration-500" />
                  Studio Location
                </p>
                <p className="font-serif text-[20px] md:text-[24px] text-forest leading-[1.6]">
                  Y Architects, Chenakkal<br/>
                  Kottakkal, Malappuram<br/>
                  Kerala – 676503, India
                </p>
              </motion.div>
              
              <motion.div variants={sideReveal} className="group cursor-default">
                <p className="font-sans text-sage text-[9px] tracking-[0.3em] uppercase font-bold mb-3 flex items-center gap-3">
                  <span className="w-4 h-[1px] bg-sage group-hover:w-8 transition-all duration-500" />
                  Direct Contact
                </p>
                <a href="mailto:hello@yarchitects.com" className="font-serif text-[20px] md:text-[24px] text-forest leading-[1.6] hover:text-sage transition-colors duration-300 block w-fit">
                  hello@yarchitects.com
                </a>
                <p className="font-serif text-[20px] md:text-[24px] text-forest leading-[1.6]">
                  +91 99959 87125
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Staggered Form */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sideRevealRight}
            className="lg:col-span-7 bg-white/40 backdrop-blur-md p-8 md:p-14 rounded-2xl md:rounded-[2rem] border border-forest/5 shadow-xl shadow-forest/[0.02]"
          >
            <motion.form variants={staggerContainer} className="flex flex-col gap-8 md:gap-10">
              
              <motion.div variants={fadeUp} className="flex flex-col relative group">
                <label className="font-sans text-[9px] md:text-[10px] tracking-[0.25em] text-forest/40 uppercase font-bold mb-2 group-focus-within:text-sage transition-colors">Your Name</label>
                <input 
                  type="text" 
                  className="bg-transparent border-b border-forest/10 py-2 md:py-3 text-forest font-serif text-lg md:text-xl focus:outline-none transition-colors rounded-none w-full relative z-10" 
                />
                {/* Animated Bottom Border on Focus */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-sage scale-x-0 group-focus-within:scale-x-100 origin-left transition-transform duration-500 ease-out" />
              </motion.div>
              
              <motion.div variants={fadeUp} className="flex flex-col relative group">
                <label className="font-sans text-[9px] md:text-[10px] tracking-[0.25em] text-forest/40 uppercase font-bold mb-2 group-focus-within:text-sage transition-colors">Email Address</label>
                <input 
                  type="email" 
                  className="bg-transparent border-b border-forest/10 py-2 md:py-3 text-forest font-serif text-lg md:text-xl focus:outline-none transition-colors rounded-none w-full relative z-10" 
                />
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-sage scale-x-0 group-focus-within:scale-x-100 origin-left transition-transform duration-500 ease-out" />
              </motion.div>
              
              <motion.div variants={fadeUp} className="flex flex-col relative group">
                <label className="font-sans text-[9px] md:text-[10px] tracking-[0.25em] text-forest/40 uppercase font-bold mb-2 group-focus-within:text-sage transition-colors">Project Scope</label>
                <textarea 
                  rows={3} 
                  className="bg-transparent border-b border-forest/10 py-2 md:py-3 text-forest font-serif text-lg md:text-xl focus:outline-none transition-colors resize-none rounded-none w-full relative z-10"
                ></textarea>
                <span className="absolute bottom-[4px] left-0 w-full h-[1px] bg-sage scale-x-0 group-focus-within:scale-x-100 origin-left transition-transform duration-500 ease-out" />
              </motion.div>
              
              <motion.button 
                variants={fadeUp}
                type="button" 
                className="mt-4 bg-forest text-cream hover:bg-sage transition-all duration-500 py-4 md:py-5 px-10 font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-bold w-full md:w-fit flex items-center justify-center gap-4 rounded-full group/btn relative overflow-hidden"
              >
                <span className="relative z-10">Submit Inquiry</span> 
                <span className="relative z-10 group-hover/btn:translate-x-2 transition-transform duration-500">⟶</span>
              </motion.button>
            </motion.form>
          </motion.div>
        </div>

        {/* ── INTERACTIVE GOOGLE MAP SECTION ── */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={staggerContainer}
          className="mt-20 md:mt-32 pt-12 md:pt-16 relative"
        >
          <motion.div variants={drawLine} className="absolute top-0 left-0 w-full h-[1px] bg-forest/10 origin-left" />

          <motion.div variants={sideReveal} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 gap-5">
            <div>
              <p className="font-sans text-sage text-[9px] tracking-[0.3em] uppercase font-bold mb-3">Navigation</p>
              <h2 className="font-serif text-3xl md:text-5xl text-forest font-light tracking-tight">Visit the Studio.</h2>
            </div>
            <a 
              href="https://www.google.com/maps/place/Y+Architects/@10.9786144,76.0081004,17z" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-sans text-[9px] tracking-[0.2em] uppercase text-forest/50 hover:text-sage transition-colors duration-300 pb-1 group"
            >
              Open in Google Maps 
              <span className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300">↗</span>
            </a>
          </motion.div>

          {/* Cinematic Curtain Reveal for the Map */}
          <motion.div variants={clipReveal} className="w-full h-[40vh] md:h-[55vh] bg-forest/5 relative grayscale-[40%] hover:grayscale-0 transition-all duration-1000 ease-out overflow-hidden rounded-2xl md:rounded-[2rem] group shadow-lg">
            <iframe 
              src="https://www.google.com/maps?q=Y+Architects,Chenakkal,Kottakkal,Kerala&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            ></iframe>
            <div className="absolute inset-0 bg-forest/5 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
          </motion.div>
        </motion.div>

      </div>
    </main>
  );
}