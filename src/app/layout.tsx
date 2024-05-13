import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FooterComponenet from "@/components/footer/Footer";
import NavbarComponenet from "@/components/navbar/Navbar";
import { NavbarProvider } from "@/context/navbarContent";
import { font_body } from "./fonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PUBG STATS",
  description: "Suas estatisticas oficiais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} ${font_body.className} ${font_body.variable}`}>
        <NavbarProvider>
          <div className="container">
            <div className="slot">
              <div className="navbar_slot">
                <NavbarComponenet/>
              </div>

              <div className="home_slot">
                {children}
              </div>
            </div>
            <div className="footer_slot">
              <FooterComponenet/>
            </div>
          </div>
        </NavbarProvider>
      </body>
    </html>
  );
}
