import ContactHero from "./ContactHero/ContactHero";
import OfficeLocations from "./OfficeLocations/OfficeLocations";
import ProductionMap from "./ProductionMap/ProductionMap";
import ContactForm from "./ContactForm/ContactForm";

import "./contact-page.css";

export default function ContactPage() {
  return (
    <main className="contact-page">
      <ContactHero />
      <OfficeLocations />
      <ProductionMap />
      <ContactForm />
    </main>
  );
}