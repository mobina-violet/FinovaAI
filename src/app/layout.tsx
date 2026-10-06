import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
//FONT IRAN SANS
const iranSans = localFont({
  src: "../fonts/A-Iranian-Sans/Iranian Sans.ttf",
  variable: "--font-iransans",
  weight: "400",
  style: "normal",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Finova AI | داده‌های مالی شما، تصمیم‌های هوشمند",
  description: "دستیار مالی هوشمند برای کسب‌وکارها",
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
