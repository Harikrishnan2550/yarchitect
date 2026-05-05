import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection'; // Replaced AboutTeaser
import WhyChooseUs from '@/components/home/WhyChooseUs';   // Newly added section
import ServicesTeaser from '@/components/home/ServicesTeaser';
import GalleryTeaser from '@/components/home/GalleryTeaser';
import HomeCta from '@/components/home/HomeCta';

export default function Home() {
  return (
    // Updated base styling to match the new Light Editorial theme
    // Selection colors updated to gold background with white text
    <main className="relative w-full bg-[#FAFAFA] text-[#0F2517] font-sans selection:bg-[#D4AF37] selection:text-white overflow-x-clip min-h-screen">
      
      {/* Note: <HomeBackground /> was removed because all new sections 
        (Hero, About, Services) now have their own dedicated, 
        highly-customized backgrounds and noise overlays. 
      */}

      {/* Relative Foreground Content */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <WhyChooseUs />
        <GalleryTeaser />
        <ServicesTeaser />
        <HomeCta />
      </div>
      
    </main>
  );
}