import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import Header from "./(user)/header/header";
import Footer from "./(user)/footer/footer";
import { Providers } from "./providers"; // 👈 dùng wrapper
import { ToastContainer } from "react-toastify";
import { CountProvider } from "./(user)/test/TestUseReducer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          {/* <Header /> */}
          <CountProvider>
            {children}
            <ToastContainer
              position="top-center"
              autoClose={2000}
              theme="light"
            />
          </CountProvider>

          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
