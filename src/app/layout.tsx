import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://www.cikidu.web.id"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "cikidu.play | Inspirasi Bermain Edukatif untuk Anak",
    template: "%s | cikidu.play",
  },
  description:
    "Temukan inspirasi bermain edukatif dan playkit untuk mendukung tumbuh kembang anak. Aktivitas seru untuk bonding orang tua dan anak.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "cikidu.play | Inspirasi Bermain Edukatif untuk Anak",
    description:
      "Temukan inspirasi bermain edukatif dan playkit untuk mendukung tumbuh kembang anak.",
    url: BASE_URL,
    siteName: "cikidu.play",
    locale: "id_ID",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
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
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "cikidu.play",
            url: "https://www.cikidu.web.id",
            description: "Inspirasi bermain edukatif untuk anak usia 1–6 tahun",
          }}
        />
      </body>
    </html>
  );
}
