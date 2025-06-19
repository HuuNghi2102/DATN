// app/admin/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./header/page";
// import "../../globals.css";
import { Providers } from "../providers";

// Admin layout không có Header/Footer

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Panel",
  description: "Admin dashboard layout",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
        <Providers>
          <Header />
          {/* Có thể thêm Sidebar hoặc Navbar cho admin nếu muốn */}
          {children}
        </Providers>
  );
}
