// app/admin/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
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
    <main className={`${geistSans.variable} ${geistMono.variable}`}>
      {children}
    </main>
  );
}

