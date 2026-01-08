import React from "react";
import { TentangSection, StrukturSection } from "./organisms";
import { ScrollReveal } from "../shared/molecules/ScrollReveal";

export const AboutTemplate = () => (
  <main className="w-full min-h-screen my-auto">
    <TentangSection />
    <ScrollReveal width="100%">
      <StrukturSection />
    </ScrollReveal>
  </main>
);