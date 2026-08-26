import Navbar from "../../components/Navbar/Navbar";
import ServicesPage from "../../components/ServicesPage/ServicesPage";

export const metadata = {
  title: "Services",
  description:
    "Explore ETRA VFX services including rotoscopy, keying, matte extraction, paint, prep, matchmove, and rotomation.",
};

export default function ServicesRoute() {
  return (
    <>
      <Navbar />

      <main>
        <ServicesPage />
      </main>
    </>
  );
}