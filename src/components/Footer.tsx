// frontend/src/components/Footer.tsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const premiumEase = [0.16, 1, 0.3, 1];

export default function Footer() {
  return (
    <footer className="bg-[#0F2517] text-[#FAFAFA] pt-24 pb-8 px-6 md:px-16 lg:px-24 overflow-hidden rounded-t-[2rem]">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Top Section: Navigation & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-32">
          
          {/* Column 1: Philosophy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: premiumEase }}
            className="lg:col-span-2 max-w-sm"
          >
            <span className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A9C7E]" />
              <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#FAFAFA]/50 font-semibold">
                Studio Philosophy
              </span>
            </span>
            <p className="font-serif text-2xl leading-snug text-[#FAFAFA]/90">
              Crafting legacies through innovative design, blending organic materials with precise geometry.
            </p>
          </motion.div>

          {/* Column 2: Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: premiumEase }}
            className="flex flex-col gap-6"
          >
            <h3 className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#FAFAFA]/50 font-semibold mb-2">
              Sitemap
            </h3>
            <div className="flex flex-col gap-4 font-sans text-[12px] tracking-[0.2em] uppercase">
              {['About', 'Gallery', 'Why Choose Us', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="w-fit text-[#FAFAFA]/80 hover:text-[#7A9C7E] transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#7A9C7E] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Contact & Locations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: premiumEase }}
            className="flex flex-col gap-6"
          >
            <h3 className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#FAFAFA]/50 font-semibold mb-2">
              Connect
            </h3>
            <div className="flex flex-col gap-4 font-sans text-[14px] font-light text-[#FAFAFA]/80">
              <a href="mailto:hello@yarchitects.com" className="hover:text-[#7A9C7E] transition-colors duration-300 w-fit">
                hello@yarchitects.com
              </a>
              <p className="tracking-wider">+91 98765 43210</p>
            </div>
            <div className="mt-4 pt-6 border-t border-[#FAFAFA]/10">
              <p className="font-sans text-[10px] leading-loose tracking-[0.2em] uppercase text-[#FAFAFA]/40">
                Kerala <br />
                Bangalore <br />
                Dubai
              </p>
            </div>
          </motion.div>
        </div>

        {/* Middle Section: Massive Typography */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: premiumEase }}
          className="w-full flex items-center justify-center mb-12 border-b border-[#FAFAFA]/10 pb-12"
        >
          <h1 className="font-serif text-[12vw] leading-none tracking-tighter text-[#FAFAFA] opacity-90 whitespace-nowrap">
            Y ARCHITECTS
          </h1>
        </motion.div>

        {/* Bottom Bar: Copyright, Credits & Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: premiumEase }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 font-sans text-[9px] tracking-[0.3em] text-[#FAFAFA]/30 uppercase text-center md:text-left"
        >
          <p>© {new Date().getFullYear()} Y Architects. All rights reserved.</p>
          
          <p>
            Developed by{' '}
            <a 
              href="https://winshineinfotech.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#7A9C7E] hover:text-[#FAFAFA] font-semibold transition-colors duration-300"
            >
              Winshine Infotech
            </a>
          </p>

          <div className="flex gap-6 md:gap-8 justify-center">
            <Link href="/privacy" className="hover:text-[#FAFAFA]/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#FAFAFA]/60 transition-colors">Terms of Service</Link>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}