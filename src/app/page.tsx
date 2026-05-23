import Nav from "@/components/incredibots/Nav";
import Hero from "@/components/incredibots/Hero";
import ScrollText from "@/components/incredibots/ScrollText";
import About from "@/components/incredibots/About";
import Legacy from "@/components/incredibots/Legacy";
import Journey from "@/components/incredibots/Journey";
import Outreach from "@/components/incredibots/Outreach";
import Sponsors from "@/components/incredibots/Sponsors";
import Contact from "@/components/incredibots/Contact";
import Footer from "@/components/incredibots/Footer";
import SponsorFlash from "@/components/incredibots/SponsorFlash";
import { Spotlight, ProgressBar } from "@/components/incredibots/primitives";

export default function Home() {
  return (
    <>
      <div className="aurora" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Spotlight />
      <ProgressBar />
      <Nav />
      <div id="root-content">
        <Hero />
        <ScrollText />
        <About />
        <Legacy />
        <Journey />
        <Outreach />
        <Sponsors />
        <Contact />
      </div>
      <Footer />
      <SponsorFlash />
    </>
  );
}
