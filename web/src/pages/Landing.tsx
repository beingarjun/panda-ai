import React, { useMemo } from "react";
import { Hero } from "../components/Hero";
import { FeatureGrid } from "../components/FeatureGrid";
import { Pricing } from "../components/Pricing";
import { Guides } from "../components/Guides";

export default function Landing() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <div>
      <Hero />
      <FeatureGrid />
      <Pricing />
      <Guides />
      <footer style={{ textAlign: "center", marginTop: 48, padding: 24, color: "#6b7280" }}>
        Panda. All rights reserved. © {year}
      </footer>
    </div>
  );
}
