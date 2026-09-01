import ContactHero from "./ContactHero/ContactHero";
import OfficeLocations from "./OfficeLocations/OfficeLocations";
import ContactForm from "./ContactForm/ContactForm";

import "./contact-page.css";

export default function ContactPage() {
  return (
    <main className="contact-page">
      <ContactHero />
      <OfficeLocations />
      <ContactForm />
    </main>
  );
}