import Navbar from "../../components/Navbar/Navbar";
import Team from "../../components/Team/Team";
import ServicesPortfolio from "../../components/ServicesPage/ServicesPortfolio/ServicesPortfolio";
import Footer from "../../components/Footer/Footer";

export const metadata = {
  title: "Our Team | ETRA Dreams",
  description:
    "Meet the artists, supervisors, producers, technologists, and operational leaders behind ETRA Dreams.",
};

export default function TeamPage() {
  return (
    <>
      <Navbar />

      <main id="top">
        <Team />

        <ServicesPortfolio />
      </main>

      <Footer />
    </>
  );
}