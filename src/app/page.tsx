import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import WhyUs from "@/components/landing/WhyUs";
import Faq from "@/components/landing/Faq";
import CtaBanner from "@/components/landing/CtaBanner";
import Footer from "@/components/landing/Footer";
import { getCurrentUser } from "@/lib/session";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <Header isLoggedIn={Boolean(user)} />
      <>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: "FinovaAI",
                url: siteConfig.url,
                logo: `${siteConfig.url}/icon.png`,
                email: siteConfig.email,
              },
              {
                "@type": "WebSite",
                name: "FinovaAI",
                url: siteConfig.url,
                inLanguage: "fa-IR",
              },
            ],
          }}
        />
      </>
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
