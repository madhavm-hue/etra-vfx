import CareerHero from "./CareerHero/CareerHero";
import CareerIntro from "./CareerIntro/CareerIntro";
import OpenPositions from "./OpenPositions/OpenPositions";
import CareerBenefits from "./CareerBenefits/CareerBenefits";
import CareerCTA from "./CareerCTA/CareerCTA";

import "./career-page.css";

export default function CareerPage() {
  return (
    <main
      id="top"
      className="career-page"
    >
      <CareerHero />

      <CareerIntro />

      <OpenPositions />

      <CareerBenefits />

      <CareerCTA />
    </main>
  );
}