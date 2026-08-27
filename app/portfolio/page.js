import Navbar from "../../components/Navbar/Navbar";
import PortfolioPage from "../../components/PortfolioPage/PortfolioPage";
import Footer from "../../components/Footer/Footer";

export const metadata = {
  title: "Portfolio | ETRA Dreams",
  description:
    "Explore selected film and episodic visual effects productions crafted by ETRA Dreams.",
};

export default function Portfolio() {
  return (
    <>
      <Navbar />

      <PortfolioPage />

      <Footer />
    </>
  );
}