import React from "react";
import { LineHeading } from "../molecules";
import { TimelineItem } from "../molecules/TimelineItem";

export const StrukturSection = () => {
  return (
    <section className="relative px-6 lg:px-24 xl:px-48 py-16">
      <LineHeading title="Struktur Program" />

      {/* Vertical Timeline Line */}
      <div className="absolute top-48 left-1/2 transform -translate-x-1/2 w-1 h-[80%] bg-gray-300"></div>

      <div className="flex flex-col gap-24 mt-16">
        
        <TimelineItem
          number="1"
          title="Tahap Pelatihan"
          description="Peserta akan mengikuti sesi pembelajaran terstruktur yang mencakup materi dasar hingga lanjutan melalui metode:"
          list={[
            "Teori dan Konsep Dasar",
            "Studi Kasus",
            "Simulasi dan Praktik",
            "Diskusi dan Konsultasi Materi",
          ]}
        />

        <TimelineItem
          number="2"
          title="Tahap Assessment (Uji Kompetensi)"
          description="Setelah pelatihan selesai, peserta mengikuti ujian penilaian kemampuan oleh Assessor Kompetensi LSP PB sesuai standar BNSP:"
          list={[
            "Ujian tertulis",
            "Observasi praktik",
            "Wawancara kompetensi",
            "Penelusuran bukti portofolio",
          ]}
        />

        <TimelineItem
          number="3"
          title="Kompeten & Sertifikasi"
          description="Peserta yang dinilai kompeten akan mendapatkan:"
          list={[
            "Sertifikat Kompetensi Resmi dari BNSP",
            "Legalitas sebagai Wakil Penasihat Berjangka",
            "Hak untuk berpraktik secara profesional",
            "Kesempatan remedial assessment tanpa mengulang pelatihan",
          ]}
        />
      </div>
    </section>
  );
};