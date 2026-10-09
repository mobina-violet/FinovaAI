import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import WhyUs from "@/components/landing/WhyUs";
import Faq from "@/components/landing/Faq";
import CtaBanner from "@/components/landing/CtaBanner";
import Footer from "@/components/landing/Footer";
import { getCurrentUser } from "@/lib/session";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <Header isLoggedIn={Boolean(user)} />
      <main>
        <Hero />
        <Features />
        <WhyUs />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}