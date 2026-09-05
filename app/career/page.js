import Navbar from "../../components/Navbar/Navbar";
import CareerPage from "../../components/CareerPage/CareerPage";
import Footer from "../../components/Footer/Footer";

export const metadata = {
  title: "Careers",
  description:
    "Explore career opportunities at ETRA Dreams and help create high-end visual effects for films and episodic productions.",
};

export default function Careers() {
  return (
    <>
      <Navbar />

      <CareerPage />

      <Footer />
    </>
  );
}