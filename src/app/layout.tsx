import type { Metadata ,Viewport } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";
//FONT IRAN SANS
const iranSans = localFont({
  src: "../fonts/A-Iranian-Sans/Iranian Sans.ttf",
  variable: "--font-iransans",
  weight: "400",
  style: "normal",
  display: "swap",
});
const title = "FinovaAI |داده‌های مالی شما، تصمیم‌های هوشمند";
const description =
  "دستیار مالی هوشمند برای کسب‌وکارهای کوچک: ثبت درآمد و هزینه به زبان ساده، مدیریت چک و گزارش لحظه‌ای با هوش مصنوعی.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description,
  applicationName: "FinovaAI",
  keywords: [
    "دستیار مالی هوشمند",
    "حسابداری هوش مصنوعی",
    "مدیریت مالی کسب‌وکار کوچک",
    "ثبت هزینه و درآمد",
    "مدیریت چک",
    "Finova AI",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "FinovaAI",
    url: "/",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0d0c",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={iranSans.variable}>
      <body className="bg-bg font-sans text-fg antialiased">{children}</body>
    </html>
  );
}