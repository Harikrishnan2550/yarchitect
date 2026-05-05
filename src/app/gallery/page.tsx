'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';

// Premium architectural easing
const premiumEase = [0.16, 1, 0.3, 1];

// ─── STAGGERED SIDE REVEAL VARIANTS ─────────────────────────────
const sideReveal = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 1.2, ease: premiumEase } 
  }
};

const sideRevealRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 1.2, ease: premiumEase } 
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: premiumEase } 
  }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const portfolioData = [
  { id: 1, title: "The Laterite House", category: "Residential", location: "Malappuram", image: "/hero2.png" },
  { id: 2, title: "Monsoon Retreat", category: "Hospitality", location: "Kochi", image: "/hero2.png" },
  { id: 3, title: "Oasis Workspace", category: "Commercial", location: "Calicut", image: "/hero2.png" },
  { id: 4, title: "Vastu Courtyard", category: "Residential", location: "Thrissur", image: "/hero2.png" },
  { id: 5, title: "The Brass Pavilion", category: "Cultural", location: "Trivandrum", image: "/hero2.png" },
  { id: 6, title: "Urban Canopy", category: "Commercial", location: "Ernakulam", image: "/hero2.png" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const categories = ['All', 'Residential', 'Commercial', 'Hospitality', 'Cultural'];
  const filteredProjects = filter === 'All' 
    ? portfolioData 
    : portfolioData.filter(p => p.category === filter);

  return (
    <main className="min-h-screen bg-cream text-forest selection:bg-sage selection:text-white overflow-x-hidden" ref={containerRef}>
      
      {/* Top Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-sage origin-left z-[100]" style={{ scaleX }} />

      <div className="max-w-[1400px] mx-auto px-5 md:px-[6%] pt-32 md:pt-48 pb-20">
        
        {/* ── 1. HEADER ── */}
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          animate="visible" 
          className="flex flex-col items-start mb-12 md:mb-20"
        >
          <motion.div variants={sideReveal} className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            <p className="font-sans text-forest/50 tracking-[0.3em] text-[9px] md:text-[10px] uppercase font-bold">
              Gallery // Works
            </p>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1 variants={sideReveal} className="font-serif text-[13vw] md:text-[100px] lg:text-[120px] font-light leading-[1.1] tracking-tighter">
              The <span className="text-sage italic">Archives.</span>
            </motion.h1>
          </div>
          
          <motion.p variants={sideReveal} className="font-sans font-light text-[15px] leading-[1.8] text-forest/70 max-w-[480px] mt-6 border-l border-sage/30 pl-5">
            A chronological survey of contextual architecture. Each structure is a response to the specific geometry of its site.
          </motion.p>
        </motion.div>

        {/* ── 2. FEATURED PROJECT ── */}
        <section className="mb-20 md:mb-32 border-t border-forest/10 pt-10 md:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={staggerContainer}
              className="lg:col-span-5 flex flex-col order-2 lg:order-1"
            >
              <motion.span variants={sideReveal} className="font-sans text-sage text-[10px] tracking-[0.3em] uppercase font-bold mb-4">Case 01</motion.span>
              <motion.h2 variants={sideReveal} className="font-serif text-[9vw] md:text-5xl lg:text-6xl text-forest leading-tight mb-6">
                The Heritage <br /> <span className="italic text-sage font-light">Laterite House.</span>
              </motion.h2>
              <motion.p variants={sideReveal} className="font-sans font-light text-[14px] md:text-[15px] leading-[1.7] text-forest/70 mb-8">
                Raw materials meeting modern silhouettes. This residence leverages the thermal mass of laterite stones for natural cooling.
              </motion.p>
              <motion.div variants={sideReveal} className="h-[1px] w-full bg-forest/10 mb-8" />
              <motion.div variants={sideReveal} className="flex gap-10">
                <div>
                  <p className="font-sans text-[8px] tracking-[0.2em] uppercase text-forest/40 mb-1">Project</p>
                  <p className="font-serif text-lg text-forest">Private Villa</p>
                </div>
                <div>
                  <p className="font-sans text-[8px] tracking-[0.2em] uppercase text-forest/40 mb-1">Status</p>
                  <p className="font-serif text-lg text-forest italic">Completed</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={sideRevealRight}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="lg:col-span-7 h-[50vh] md:h-[60vh] w-full overflow-hidden bg-forest rounded-2xl md:rounded-[2rem] order-1 lg:order-2 group relative shadow-xl"
            >
              <img src="/hero2.png" alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[20%] group-hover:grayscale-0" />
            </motion.div>
          </div>
        </section>

        {/* ── 3. CATEGORY FILTER ── */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sideReveal}
          className="flex flex-wrap items-center gap-5 md:gap-10 mb-12 border-b border-forest/10 pb-5 overflow-x-auto no-scrollbar"
        >
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className="relative group pb-2 shrink-0">
              <span className={`font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold transition-colors duration-500 ${filter === cat ? 'text-forest' : 'text-forest/30 group-hover:text-forest/60'}`}>
                {cat}
              </span>
              {filter === cat && (
                <motion.div layoutId="activeFilterLine" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-sage" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
            </button>
          ))}
        </motion.div>

        {/* ── 4. RESPONSIVE GRID ── */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 md:gap-x-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div 
                layout 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-5%" }} 
                variants={index % 2 === 0 ? sideReveal : sideRevealRight}
                key={project.id} 
                className="group cursor-pointer flex flex-col"
              >
                <div className="overflow-hidden w-full aspect-[4/5] bg-forest mb-5 relative rounded-xl md:rounded-[1.5rem] shadow-sm group-hover:shadow-xl transition-all duration-700">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-forest/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                <div className="flex flex-col px-1">
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="font-sans text-sage text-[9px] tracking-[0.2em] uppercase font-bold">{project.category} • {project.location}</p>
                    <span className="font-serif text-forest/20 italic text-sm group-hover:text-sage transition-colors">0{project.id}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-forest group-hover:text-sage transition-colors duration-500 tracking-tight leading-tight">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── 5. CLEAN CTA ── */}
        <section className="relative py-24 md:py-40 text-center border-t border-forest/10 mt-20">
          <Link href="/contact" className="group inline-flex flex-col items-center">
            <motion.span initial="hidden" whileInView="visible" variants={sideReveal} className="font-sans text-[10px] tracking-[0.3em] uppercase text-sage mb-6 font-bold flex items-center gap-4">
              <span className="w-6 h-[1px] bg-sage" /> Reach out <span className="w-6 h-[1px] bg-sage" />
            </motion.span>
            <motion.h2 initial="hidden" whileInView="visible" variants={sideRevealRight} className="font-serif text-[10vw] md:text-7xl text-forest font-light leading-none">
              Start a project <span className="italic text-sage font-light group-hover:text-forest transition-colors duration-700">together ⟶</span>
            </motion.h2>
          </Link>
        </section>

      </div>
    </main>
  );
}