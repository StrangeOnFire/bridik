import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/common/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "bridik",
  description:
    "Bridik.in is an AI-driven platform designed to help individuals enhance their skills and advance their careers. Discover personalized learning paths, access resources, and close skill gaps to achieve your professional goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col  min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-800 text-white py-4 text-center">
          © 2024 bridik.in
        </footer>
      </body>
    </html>
  );
}
