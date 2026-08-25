import Navbar from "../components/Navbar/Navbar";
import Intro from "../components/Intro/Intro";
import Services from "../components/Services/Services";
import About from "../components/About/About";
import Portfolio from "../components/Portfolio/Portfolio";
import Clients from "../components/Common/Clients";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="top">
        <Intro />
        <Services />
        <About />
        <Portfolio />
        <Clients />
        <Contact />
      </main>

      <Footer />
    </>
  );
}