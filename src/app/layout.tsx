import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout"; // Import the new wrapper

// High-end architectural typography
const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter' 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: '--font-playfair' 
});

// Custom SEO Metadata for the firm
export const metadata: Metadata = {
  title: "Y Architects | Redefining Spaces",
  description: "Innovative architectural and interior design solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen flex flex-col bg-[#FAFAFA]`}>
        {/* Pass all children into our smart client layout */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}