import { LineHeading } from "../molecules";
import { TestimoniBox } from "./TestimoniBox";

const testimonialData = [
  {
    src: "/assets/Logo-Tab.png",
    comment:
      "Pelatihan ini membuka wawasan saya tentang dinamika pasar komoditi. Saya kini memahami manajemen risiko dengan lebih baik dan siap menghadapi volatilitas pasar.",
    title: "Upin Susanto",
    description: "Junior Broker",
  },
  {
    src: "/assets/Logo-Tab.png",
    comment:
      "Mentornya adalah praktisi berpengalaman di bursa berjangka. Studi kasus yang diberikan sangat relevan dan membantu saya lulus ujian sertifikasi WPB dengan nilai memuaskan.",
    title: "Nabila Rahmadani",
    description: "Financial Consultant",
  },
  {
    src: "/assets/Logo-Tab.png",
    comment:
      "Materi analisis teknikal sangat mendalam. Saya belajar banyak tentang pola grafik dan indikator yang krusial untuk pengambilan keputusan trading yang objektif.",
    title: "Fajar Saputra",
    description: "Trader Independen",
  },
  {
    src: "/assets/Logo-Tab.png",
    comment:
      "Sangat merekomendasikan LPK ini bagi siapa saja yang ingin serius di industri berjangka. Fasilitas simulasi tradingnya sangat membantu sebelum terjun ke akun real.",
    title: "Siti Aisyah",
    description: "Risk Officer",
  },
  {
    src: "/assets/Logo-Tab.png",
    comment:
      "Jaringan alumni yang kuat memudahkan saya mendapatkan penempatan kerja di salah satu pialang berjangka terkemuka di Jakarta.",
    title: "Rizky Mahendra",
    description: "Business Development",
  },
  {
    src: "/assets/Logo-Tab.png",
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
