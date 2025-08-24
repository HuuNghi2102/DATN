import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../globals.css";
import Header from "./header/header";
import Footer from "./footer/footer";
import { Providers } from "../providers"; // 👈 dùng wrapper
import ChatBox from "../(admin)/admin/components/ChatBox/ChatBox";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VerveStyle",
  description: "VerveStyle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Providers>
        <Header />
        <ChatBox />
        {children}
        <Footer />
      </Providers>
    </>
  );
}
