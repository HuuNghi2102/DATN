// app/admin/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "./admin/components/Sidebar"; // Giả sử bạn đặt Sidebar tại `app/admin/components/sidebar.tsx`

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
    <html lang="en">
      <body className={`flex min-h-screen bg-gray-100 ${geistSans.variable} ${geistMono.variable}`}>
        <Sidebar />
        <main className="flex-1 ml-0 md:ml-64 p-6">{children}</main>
      </body>
    </html>
  );
}
