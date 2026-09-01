import Navbar from "../../components/Navbar/Navbar";
import ContactPage from "../../components/ContactPage/ContactPage";
import Footer from "../../components/Footer/Footer";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact ETRA Dreams to discuss visual effects, CGI, animation, tracking, rotoscopy, paint, and complete VFX production requirements.",
};

export default function Contact() {
  return (
    <>
      <Navbar />
      <ContactPage />
      <Footer />
    </>
  );
}