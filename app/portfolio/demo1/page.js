import Navbar from "../../../components/Navbar/Navbar";
import Demo1Page from "../../../components/Demo1Page/Demo1Page";
import Footer from "../../../components/Footer/Footer";

export const metadata = {
  title: "Demo 1",
  description:
    "Explore Demo 1 from the ETRA Dreams visual effects portfolio.",
};

export default function Demo1() {
  return (
    <>
      <Navbar />
      <Demo1Page />
      <Footer />
    </>
  );
}