import ServicesHero from "./ServicesHero/ServicesHero";
import ServicesOverview from "./ServicesOverview/ServicesOverview";
import ServicesPortfolio from "./ServicesPortfolio/ServicesPortfolio";

import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";

import "./services-page.css";

export default function ServicesPage() {
  return (
    <div className="services-page">
      <ServicesHero />
      <ServicesOverview />
      <ServicesPortfolio />
      <Contact />
      <Footer />
    </div>
  );
}