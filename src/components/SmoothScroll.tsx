// frontend/src/components/SmoothScroll.tsx
'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.05, // Controls the smoothness
        duration: 1.5, 
        smoothWheel: true 
      }}
    >
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}