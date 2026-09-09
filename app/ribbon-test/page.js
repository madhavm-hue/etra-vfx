"use client";

import dynamic from "next/dynamic";

const RibbonTest = dynamic(
  () =>
    import(
      "../../components/RibbonTest/RibbonTest"
    ),
  {
    ssr: false,
    loading: () => (
      <main className="ribbon-test-loading">
        <span />
      </main>
    ),
  },
);

export default function RibbonTestPage() {
  return <RibbonTest />;
}