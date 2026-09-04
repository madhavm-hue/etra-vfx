import Demo1Hero from "./Demo1Hero/Demo1Hero";
import PortfolioScene from "./PortfolioScene/PortfolioScene";
import Demo1Outro from "./Demo1Outro/Demo1Outro";

import "./demo1-page.css";

export default function Demo1Page() {
  return (
    <main
      id="top"
      className="demo1-page"
    >
      <Demo1Hero />

      <PortfolioScene />

      <Demo1Outro />
    </main>
  );
}