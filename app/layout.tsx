import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Footer from "@/components/footer/Footer";
import { getServerSession } from "next-auth";
//import { authOptions } from "./api/auth/[...nextauth]/route";
import { authOptions } from "@/utils/authOptions";
import AuthProvider from "@/utils/SessionProvider";
import ReduxProvider from "@/utils/ReduxProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="customColor" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="customColor"
        />
        <link rel="icon" href="/logoIcon.png" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/logoIcon.png" />
        <title>Cinepiks</title>
      </head>
      <body>
        <AuthProvider session={session}>
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
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
