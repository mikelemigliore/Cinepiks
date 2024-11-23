"use client"
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Footer from "@/components/footer/Footer";
import { useState } from "react";
import { usePathname } from "next/navigation";

// Correct metadata export (without viewport and themeColor)
// export const metadata = {
//   title: "Movies Website",
//   description: "A website for movies",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  //const [isLogged , setIsLogged] = useState(true)
  const pathname = usePathname();
  
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="customColor" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="customColor"
        />
      </head>
      <body>
        {/* Conditionally render Navbar */}
        {pathname !== "/" && (
          <nav className="fixed w-full bg-customColor py-[1vw] md:bg-transparent lg:bg-gradient-to-b md:from-customColor/50 md:to-transparent md:hover:bg-customColor md:transition-all md:duration-700 z-[100]">
            <Navbar />
          </nav>
        )}
        <main>
          <Container>{children}</Container>
        </main>
        <footer className="mt-auto bg-customFooterBackground text-white pb-10 md:pb-0">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
