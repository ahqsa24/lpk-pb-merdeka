// components/organisms/StatsGrid.tsx
import React from "react";
import { StatBox } from "../molecules";

export const StatsGrid = () => (
  <section className="bg-red-600 overflow-hidden py-8">
    <div className="flex whitespace-nowrap animate-scroll">
      <div className="flex gap-16 px-64">
        <StatBox number={10} label="Unit Kompetisi" />
        <StatBox number={"98%"} label="Positive Review" />
        <StatBox number={"200+"} label="Peserta" />
        <StatBox number={2} label="Program Pelatihan" />
        <StatBox number={25} label="Instruktur Bersertifikasi" />
        <StatBox number={"100%"} label="Lulusan Terserap" />
      </div>

      {/* duplicate content for infinite loop */}
      <div className="flex gap-16 px-64">
        <StatBox number={10} label="Unit Kompetisi" />
        <StatBox number={"98%"} label="Positive Review" />
        <StatBox number={"200+"} label="Peserta" />
        <StatBox number={2} label="Program Pelatihan" />
        <StatBox number={25} label="Instruktur Bersertifikasi" />
        <StatBox number={"100%"} label="Lulusan Terserap" />
      </div>
    </div>
  </section>
);
