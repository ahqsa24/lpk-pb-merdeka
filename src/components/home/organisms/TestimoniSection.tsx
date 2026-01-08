import { LineHeading } from "../../shared/molecules";
import { TestimoniBox } from "./TestimoniBox";

const testimonialData = [
  {
    src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
    comment:
      "Pelatihan ini membuka wawasan saya tentang dinamika pasar komoditi. Saya kini memahami manajemen risiko dengan lebih baik dan siap menghadapi volatilitas pasar.",
    title: "Upin Susanto",
    description: "Junior Broker",
  },
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
    comment:
      "Mentornya adalah praktisi berpengalaman di bursa berjangka. Studi kasus yang diberikan sangat relevan dan membantu saya lulus ujian sertifikasi WPB dengan nilai memuaskan.",
    title: "Nabila Rahmadani",
    description: "Financial Consultant",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
    comment:
      "Materi analisis teknikal sangat mendalam. Saya belajar banyak tentang pola grafik dan indikator yang krusial untuk pengambilan keputusan trading yang objektif.",
    title: "Fajar Saputra",
    description: "Trader Independen",
  },
  {
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100",
    comment:
      "Sangat merekomendasikan LPK ini bagi siapa saja yang ingin serius di industri berjangka. Fasilitas simulasi tradingnya sangat membantu sebelum terjun ke akun real.",
    title: "Siti Aisyah",
    description: "Risk Officer",
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100",
    comment:
      "Jaringan alumni yang kuat memudahkan saya mendapatkan penempatan kerja di salah satu pialang berjangka terkemuka di Jakarta.",
    title: "Rizky Mahendra",
    description: "Business Development",
  },
  {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100",
    comment:
      "Kurikulum yang disusun sangat sistematis, mulai dari regulasi hingga psikologi trading. Sangat bermanfaat untuk bekal karir profesional saya.",
    title: "Dewi Kurniawati",
    description: "Compliance Staff",
  },
];

export const TestimoniSection = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-6 lg:px-12 xl:px-24">
      <div className="mb-12 text-center">
        <LineHeading title="Kata Alumni Kami" />
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Dengar langsung dari mereka yang telah merasakan dampak positif dari program pelatihan kami.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonialData.map((item, index) => (
          <TestimoniBox
            key={index}
            src={item.src}
            comment={item.comment}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  </section>
);
