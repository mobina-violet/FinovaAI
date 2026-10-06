import CtaBanner from "@/components/landing/CtaBanner";
import Faq from "@/components/landing/Faq";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import WhyUs from "@/components/landing/WhyUs";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <WhyUs />
        <Faq />
        <CtaBanner />
        <Footer />
      </main>
    </>
  );
}
