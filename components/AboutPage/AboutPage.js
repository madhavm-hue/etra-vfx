import AboutHero from "./AboutHero/AboutHero";
import StudioStory from "./StudioStory/StudioStory";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import ServiceHighlights from "./ServiceHighlights/ServiceHighlights";
import AboutContact from "./AboutContact/AboutContact";

import Portfolio from "../Portfolio/Portfolio";

import "./about-page.css";

export default function AboutPage() {
  return (
    <main className="about-page">
      <AboutHero />
      <StudioStory />
      <WhyChooseUs />
      <ServiceHighlights />

      <Portfolio />

      <AboutContact />
    </main>
  );
}