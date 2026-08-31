import Navbar from "../../components/Navbar/Navbar";
import AboutPage from "../../components/AboutPage/AboutPage";
import Footer from "../../components/Footer/Footer";

export const metadata = {
  title: "About Us",
  description:
    "Discover ETRA Dreams, a high-end VFX studio delivering premium visual effects for films, television, animation, advertising, and entertainment.",
};

export default function About() {
  return (
    <>
      <Navbar />
      <AboutPage />
      <Footer />
    </>
  );
}