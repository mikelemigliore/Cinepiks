import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Footer from "@/components/footer/Footer";

// Correct metadata export (without viewport and themeColor)
export const metadata = {
  title: "Movies Website",
  description: "A website for movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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
        <nav className="fixed w-full bg-customColor py-0 md:bg-transparent lg:bg-gradient-to-b md:from-customColor/50 md:to-transparent md:hover:bg-customColor md:transition-all md:duration-700 z-50">
          <Navbar />
        </nav>
        <Container>{children}</Container>
        <footer className="mt-auto bg-customFooterBackground text-white pb-20 md:pb-0">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
