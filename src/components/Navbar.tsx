'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 1. Track Scroll Position
  useEffect(() => {
    const handleScroll = () => {
      // If scrolled down more than 80px, toggle state
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  // 3. Close menu automatically on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // ─── LOGO LOGIC ─────────────────────────────────────────────────────────
  // If it's NOT the home page, it's a white page.
  // If it IS the home page, it becomes white after scrolling.
  const isLightBackground = pathname !== '/' || isScrolled;
  // ────────────────────────────────────────────────────────────────────────

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        mass: 0.8,
        damping: 18, 
        stiffness: 150,
        staggerChildren: 0.05, 
        delayChildren: 0.1 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2, ease: "easeOut" } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 2.9 }}
      className="fixed top-0 left-0 w-full z-50 px-6 md:px-16 lg:px-40 py-6 md:py-8 flex justify-between items-center pointer-events-none"
    >
      
      {/* LEFT: Dynamic Smooth Crossfade Logo */}
      <div className="pointer-events-auto relative z-50">
        <Link href="/" className="relative block w-20 md:w-28 lg:w-24 hover:opacity-80 transition-opacity duration-300">
          
          {/* Black Logo (Fades IN on light backgrounds) */}
          <Image 
            src="/logo.png" // Replace with your actual black logo filename
            alt="Y Architects Logo Black" 
            width={400} 
            height={200} 
            className={`w-full h-auto object-contain absolute top-0 left-0 transition-opacity duration-500 ease-in-out ${
              isLightBackground ? 'opacity-100' : 'opacity-0'
            }`}
            priority 
          />
          
          {/* White Logo (Fades IN on dark backgrounds) */}
          {/* Note: This one remains relative to give the container its height */}
          <Image 
            src="/logo1.png" // Replace with your actual white logo filename
            alt="Y Architects Logo White" 
            width={400} 
            height={200} 
            className={`w-full h-auto object-contain relative transition-opacity duration-500 ease-in-out drop-shadow-md ${
              isLightBackground ? 'opacity-0' : 'opacity-100'
            }`}
            priority 
          />
          
        </Link>
      </div>

      {/* THE RESPONSIVE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-[#1A2F22] flex flex-col justify-center items-center pointer-events-auto md:absolute md:inset-auto md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:bg-[#1A2F22]/95 md:backdrop-blur-xl md:border md:border-[#7A9C7E]/20 md:shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:rounded-full md:overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center justify-center h-full md:h-14 px-16 py-8 md:py-0 gap-10 md:gap-14 whitespace-nowrap">
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={itemVariants}>
                  <Link 
                    href={link.path}
                    className="relative group block py-4 md:py-2"
                  >
                    <span className={`font-mono text-xl md:text-[11px] lg:text-xs tracking-[0.25em] uppercase transition-colors duration-300 ${
                      pathname === link.path ? 'text-[#7A9C7E]' : 'text-white/80 group-hover:text-white'
                    }`}>
                      {link.name}
                    </span>
                    <span className={`absolute bottom-2 md:bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#7A9C7E] transition-transform duration-300 ${
                      pathname === link.path ? 'scale-100' : 'scale-0 group-hover:scale-100'
                    }`} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RIGHT: The Premium Hamburger Icon */}
      <div className="pointer-events-auto relative z-50">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative w-12 h-12 rounded-full bg-[#1A2F22] backdrop-blur-md border border-[#7A9C7E]/30 flex flex-col justify-center items-end gap-[6px] pr-3 shadow-lg hover:border-[#7A9C7E] transition-all duration-300 group focus:outline-none"
        >
          <motion.span 
            animate={isMenuOpen ? { rotate: 45, y: 4, width: "20px" } : { rotate: 0, y: 0, width: "24px" }}
            className="h-[2px] bg-[#7A9C7E] block transition-colors group-hover:bg-white origin-center"
          />
          <motion.span 
            animate={isMenuOpen ? { rotate: -45, y: -4, width: "20px" } : { rotate: 0, y: 0, width: "14px" }}
            className="h-[2px] bg-[#7A9C7E] block transition-all duration-300 group-hover:w-[24px] group-hover:bg-white origin-center"
          />
        </button>
      </div>

    </motion.nav>
  );
}