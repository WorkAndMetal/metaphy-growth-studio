import type { Metadata } from "next";
import "./globals.css";
import SiteNavbar from "@/components/site-navbar";
export const metadata: Metadata = { title: "Metaphy Growth Studio | Dijital Reklamcılık", description: "Metaphy Growth Studio: marka stratejisi, performans pazarlaması, sosyal medya ve dönüşüm odaklı dijital reklamcılık." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="tr" className="dark"><body><SiteNavbar />{children}</body></html>; }
