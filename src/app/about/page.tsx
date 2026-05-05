  'use client';
  import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
  import { useRef, useState, useEffect } from 'react';
  import Link from 'next/link';

  // Ultra-smooth easing for a premium architectural feel
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

  const AbstractFluidShape = ({ className }: { className?: string }) => (
    <div className={`absolute pointer-events-none opacity-[0.03] blur-[60px] md:blur-[80px] ${className}`}>
      <div className="w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-[#0F2517] mix-blend-multiply absolute top-0 left-0 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full bg-[#7A9C7E] mix-blend-multiply absolute top-20 left-20 md:top-32 md:left-32 animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
    </div>
  );

  const AbstractGeometry = ({ className }: { className?: string }) => (
    <svg className={`absolute pointer-events-none opacity-[0.02] ${className}`} viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 1000L1000 0H500L0 500V1000Z" fill="currentColor" className="text-[#0F2517]" />
      <path d="M1000 1000L0 0H500L1000 500V1000Z" fill="currentColor" className="text-[#7A9C7E]" />
    </svg>
  );

  // ─── RESPONSIVE MAGNETIC COMPONENT (FIXED FOR VERCEL) ──────
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

    // BYPASS: Define props separately as 'any' to resolve React 19 / Motion type conflict
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

  // ─── MAIN PAGE COMPONENT ──────────────────────────────────
  export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const scaleX = useSpring(scrollYProgress, { stiffness: 50, damping: 20, restDelta: 0.001 });
    
    const { scrollYProgress: parallaxProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const smoothParallaxProgress = useSpring(parallaxProgress, { stiffness: 40, damping: 15, mass: 0.2 });
    const slowParallax = useTransform(smoothParallaxProgress, [0, 1], ["0%", "10%"]); 

    return (
      <main className="min-h-screen bg-[#FDFCFB] relative overflow-hidden text-[#0F2517]" ref={containerRef}>
        <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-[#7A9C7E] origin-left z-[100]" style={{ scaleX }} />

        <div className="max-w-[1400px] mx-auto px-6 md:px-[8%] relative z-10">

          {/* ── 1. HERO SECTION ── */}
          <section className="relative pt-32 md:pt-48 pb-10 md:pb-24 flex flex-col items-start justify-center min-h-[60vh] md:min-h-[85vh]">
            <HalftoneFade className="top-0 right-0 w-full md:w-1/2 h-full" />
            <AbstractFluidShape className="-top-20 -left-20 md:-top-40 md:-left-40" />

            <div className="w-full relative z-10 flex flex-col gap-6 md:gap-16">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4 md:mb-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7A9C7E]" />
                  <p className="font-sans text-[#0F2517]/50 tracking-[0.3em] text-[9px] md:text-xs uppercase font-bold">
                    Studio Manifesto
                  </p>
                </motion.div>

                <div className="flex flex-col gap-1 md:gap-2">
                  <AnimatedTitle text="Shaped by" className="font-serif text-[14vw] md:text-[100px] lg:text-[130px] font-light leading-[0.9] tracking-tighter" />
                  <div className="md:pl-16">
                    <AnimatedTitle text="Nature & Time." className="font-serif text-[14vw] md:text-[100px] lg:text-[130px] font-light leading-[0.9] tracking-tighter text-[#7A9C7E] italic" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full md:max-w-[420px] md:self-end mt-2 md:mt-4">
                <p className="font-sans font-light text-[14px] md:text-[16px] leading-[1.8] text-[#0F2517]/70 border-l border-[#7A9C7E]/30 pl-4 md:pl-5">
                  We do not merely construct buildings. We sculpt environments from raw laterite and rich timber, crafting enduring spaces that breathe with the tropical ecology of Kerala.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ── 2. CENTERED MANIFESTO QUOTE ── */}
          <section className="py-12 md:py-32 relative">
            <AbstractGeometry className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl" />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={staggerContainer} className="max-w-[1000px] mx-auto text-center relative z-10">
              <AnimatedTitle text='"Extracting the architecture that slumbers within the earth."' className="justify-center font-serif text-[9.5vw] md:text-[56px] lg:text-[64px] font-light leading-[1.1] tracking-tight text-[#0F2517]" />
            </motion.div>
          </section>

          {/* ── 3. STAGGERED EDITORIAL FLOW ── */}
          <section className="flex flex-col gap-12 md:gap-32 border-t border-[#0F2517]/10 pt-12 md:pt-24 relative">
            <HalftoneFade className="top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[600px] rotate-180 hidden md:block" />

            {/* Block 1: Philosophy */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-20 relative z-10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={safeImageReveal} className="w-full lg:w-1/2 h-[300px] md:h-[65vh] overflow-hidden relative bg-[#0F2517]/5 rounded-2xl md:rounded-3xl shrink-0">
                <motion.img style={{ y: slowParallax }} src="/img4.png" alt="Material Honesty" className="w-full h-full object-cover grayscale-[20%]" />
              </motion.div>
              
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="w-full lg:w-1/2 flex flex-col justify-center">
                <motion.span variants={fadeUp} className="font-sans text-[10px] tracking-[0.3em] text-[#7A9C7E] font-bold uppercase mb-3 md:mb-6 flex items-center gap-4">
                  01 <span className="w-6 h-[1px] bg-[#7A9C7E]" /> Philosophy
                </motion.span>
                <motion.h3 variants={fadeUp} className="font-serif text-[11vw] md:text-[56px] leading-[1] text-[#0F2517] mb-4 md:mb-8 tracking-tight">Material Honesty</motion.h3>
                <motion.p variants={fadeUp} className="font-sans font-light text-[14px] md:text-[16px] leading-[1.8] text-[#0F2517]/70 mb-3 md:mb-6">
                  Founded in Kerala, Y Architects operates at the intersection of rigorous modernist geometry and the unpredictable, vibrant ecology of the tropics. 
                </motion.p>
                <motion.p variants={fadeUp} className="font-sans font-light text-[14px] md:text-[16px] leading-[1.8] text-[#0F2517]/70">
                  By utilising raw exposed laterite and unvarnished natural timber, we allow our buildings to develop a rich patina that reflects the passage of time.
                </motion.p>
              </motion.div>
            </div>

            {/* Block 2: Approach */}
            <div className="flex flex-col lg:flex-row-reverse items-start lg:items-center gap-6 lg:gap-20 relative z-10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={safeImageReveal} className="w-full lg:w-5/12 h-[300px] md:h-[60vh] overflow-hidden relative bg-[#0F2517]/5 rounded-2xl md:rounded-3xl shrink-0">
                <motion.img style={{ y: slowParallax }} src="/img5.png" alt="Climatic Response" className="w-full h-full object-cover grayscale-[20%]" />
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="w-full lg:w-7/12 flex flex-col justify-center lg:ml-auto">
                <motion.span variants={fadeUp} className="font-sans text-[10px] tracking-[0.3em] text-[#7A9C7E] font-bold uppercase mb-3 md:mb-6 flex items-center gap-4">
                  02 <span className="w-6 h-[1px] bg-[#7A9C7E]" /> Approach
                </motion.span>
                <motion.h3 variants={fadeUp} className="font-serif text-[11vw] md:text-[56px] leading-[1] text-[#0F2517] mb-4 md:mb-8 tracking-tight">Climatic Synergy</motion.h3>
                <motion.p variants={fadeUp} className="font-sans font-light text-[14px] md:text-[16px] leading-[1.8] text-[#0F2517]/70">
                  Our master planners strictly adhere to regional climatic responses. By harnessing the monsoon breeze and filtering the equatorial sun, we create highly efficient, breathable sanctuaries.
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* ── 4. THE VALUE OF ARCHITECTURE ── */}
          <section className="py-16 md:py-32 border-t border-[#0F2517]/10 mt-16 md:mt-24 relative">
            <AbstractFluidShape className="bottom-0 right-0 w-full opacity-[0.03] hidden md:block" />

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-20 gap-4 md:gap-6">
              <div className="flex flex-col">
                <motion.span variants={fadeUp} className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#7A9C7E] font-bold mb-3 md:mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-[#7A9C7E] rotate-45" /> Why Commission Us
                </motion.span>
                <motion.h2 variants={fadeUp} className="font-serif text-[10vw] md:text-6xl text-[#0F2517] tracking-tight leading-[1.1]">The Value of <br className="hidden md:block"/>Architecture.</motion.h2>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 relative z-10">
              {[
                { title: "Spatial Symphony", desc: "We orchestrate how you live. We optimize the movement of natural light, monsoon winds, and human energy through your daily rituals." },
                { title: "Intelligent Investment", desc: "Strategic design anticipates tomorrow. We optimize material usage, ensure climate efficiency, and prevent costly construction missteps." },
                { title: "Orchestrated Execution", desc: "From navigating regional zoning regulations to ensuring contractors execute the finest micro-details, we protect your vision." }
              ].map((item, idx) => (
                <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col group relative">
                  <motion.div variants={drawLine} className="w-full h-[1px] bg-[#0F2517]/10 mb-4 md:mb-5 group-hover:bg-[#7A9C7E] transition-colors duration-500 origin-left" />
                  <motion.span variants={fadeUp} className="font-serif text-xl md:text-2xl text-[#7A9C7E] italic mb-1 md:mb-2">0{idx + 1}</motion.span>
                  <motion.h4 variants={fadeUp} className="font-serif text-[6.5vw] md:text-3xl text-[#0F2517] mb-2 md:mb-3 tracking-tight">{item.title}</motion.h4>
                  <motion.p variants={fadeUp} className="font-sans font-light text-[13px] md:text-[14px] leading-[1.8] text-[#0F2517]/70">{item.desc}</motion.p>
                </motion.div>
              ))}
            </div>
          </section>

        </div>

        {/* ── 5. MAGNETIC BOTTOM CTA ── */}
        <section className="relative py-20 md:py-10 text-center z-10 bg-[#0F2517] text-[#FDFCFB] overflow-hidden md:rounded-[3rem] mb-11">
          <AbstractGeometry className="top-0 left-0 w-full h-full opacity-10 text-white" />

          <Magnetic>
            <Link href="/contact" className="group inline-flex flex-col items-center justify-center w-full px-6 relative z-10">
                <motion.span initial="hidden" whileInView="visible" variants={fadeUp} className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#7A9C7E] mb-4 md:mb-6 font-bold flex items-center gap-4">
                  <span className="w-6 md:w-8 h-[1px] bg-[#7A9C7E] group-hover:w-16 transition-all duration-700 ease-out" />
                  The Next Step
                  <span className="w-6 md:w-8 h-[1px] bg-[#7A9C7E] group-hover:w-16 transition-all duration-700 ease-out" />
                </motion.span>
                
                {/* Refined Content Filling the Blank Space */}
                <div className="overflow-hidden mb-4 md:mb-8">
                  <motion.p 
                    initial="hidden" 
                    whileInView="visible" 
                    variants={fadeUp} 
                    className="font-serif text-xl md:text-2xl lg:text-3xl font-light text-[#FDFCFB]/80 max-w-2xl mx-auto leading-relaxed"
                  >
                    Ready to translate your vision into a living, <br className="hidden md:block" /> 
                    breathing sanctuary of timber and stone?  CONNECT US .
                  </motion.p>
                </div>

                <div className="overflow-hidden text-center">
                  <motion.span initial="hidden" whileInView="visible" variants={maskReveal} className="font-serif text-[11vw] md:text-[100px] lg:text-[120px] font-light italic leading-none group-hover:text-[#7A9C7E] transition-colors duration-700 ease-out tracking-tighter block">
                    Start your retreat ⟶
                  </motion.span>
                </div>
            </Link>
          </Magnetic>
        </section>

      </main>
    );
  }