'use client';

import { usePathname } from 'next/navigation';
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if the current route is the admin panel
  const isAdmin = pathname?.startsWith('/admin');

  // If it is the admin panel, ONLY render the page content (No Navbar, Footer, or SmoothScroll)
  if (isAdmin) {
    return <main className="flex-grow">{children}</main>;
  }

  // If it is the public website, render the full premium experience
  return (
    <SmoothScroll>
      <LoadingScreen />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </SmoothScroll>
  );
}