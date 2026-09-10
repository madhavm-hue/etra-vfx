"use client";

import dynamic from "next/dynamic";

const VortexTest = dynamic(
  () => import("./VortexTest"),
  {
    ssr: false,
    loading: () => (
      <section className="vortex-test-loading">
        <span />
      </section>
    ),
  },
);

export default function VortexSection() {
  return <VortexTest />;
}