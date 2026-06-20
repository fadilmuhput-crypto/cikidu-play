import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "cikidu.play | Inspirasi Bermain Edukatif untuk Anak",
    template: "%s | cikidu.play",
  },
  description:
    "Temukan inspirasi bermain edukatif dan playkit untuk mendukung tumbuh kembang anak. Aktivitas seru untuk bonding orang tua dan anak.",
  openGraph: {
    title: "cikidu.play | Inspirasi Bermain Edukatif untuk Anak",
    description:
      "Temukan inspirasi bermain edukatif dan playkit untuk mendukung tumbuh kembang anak.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
