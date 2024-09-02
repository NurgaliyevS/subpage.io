import Ads from "@/components/Ads";
import Demo from "@/components/Demo";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Main from "@/components/Main";
import Pricing from "@/components/Pricing";
import { customConfig } from "@/project.custom.config";
import { Roboto } from "next/font/google";
import Head from "next/head";

const lato = Roboto({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>{customConfig.documentTitle}</title>
        <link rel="canonical" href={customConfig.domainWithHttps} />
        <meta
          name="twitter:description"
          // example as Start monitoring in 30 seconds. Get notified by email, and SMS. Monitor your website, and server.
          content={customConfig.seo.description}
        />
      </Head>
      <header className={lato.className}>
        <Header />
      </header>
      <main className={`flex flex-col min-h-screen mx-auto ${lato.className}`}>
        <Main />
        <Ads />
        <Hero />
        <Demo />
        <Pricing />
        <FAQ />
      </main>
      <footer className={lato.className}>
        <Footer />
      </footer>
    </>
  );
}
