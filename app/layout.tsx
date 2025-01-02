//"use client";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Footer from "@/components/footer/Footer";
//import { useState } from "react";
import { usePathname } from "next/navigation";
// import { Provider } from "react-redux";
// import { store } from "./features/store";
import { getServerSession } from "next-auth";
//import SessionProvider from "@/utils/SessionProvider";
import { authOptions } from "./api/auth/[...nextauth]/route"; // Adjust path as necessary
import AuthProvider from "@/utils/SessionProvider"; // Use your existing AuthProvider
import ReduxProvider from "@/utils/ReduxProvider"; // Import the new ReduxProvider

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const pathname = usePathname();

  const session = await getServerSession(authOptions); // Fetch session server-side
  //const session = await getServerSession();
  //console.log("Session:", session);

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
        <AuthProvider session={session}>
          {/* Conditionally render Navbar */}
          <ReduxProvider>
            <nav>
              <Navbar />
            </nav>
            <main>
              <Container>{children}</Container>
            </main>
            <footer className="mt-auto bg-customFooterBackground text-white pb-10 md:pb-0">
              <Footer />
            </footer>
            {/* </ApiProvider> */}
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
