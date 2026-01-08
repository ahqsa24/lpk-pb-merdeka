import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { LineHeading } from "../../shared/molecules";

const RegistrationFAQSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "Apa saja dokumen yang harus disiapkan untuk pendaftaran?",
            answer: "Calon peserta wajib menyiapkan scan KTP, Ijazah Terakhir (dijamin legalisir), Transkrip Nilai, Pas Foto terbaru 4x6, dan CV (Curriculum Vitae) terbaru."
        },
        {
            question: "Apakah biaya pelatihan bisa dicicil?",
            answer: "Ya, kami menyediakan fasilitas cicilan 2x bayar. Pembayaran pertama sebesar 50% saat registrasi ulang, dan pelunasan dilakukan maksimal sebelum Ujian Tengah Pelatihan."
        },
        {
            question: "Bagaimana alur seleksi masuk LPK PB Merdeka?",
            answer: "Setelah mendaftar online, peserta akan mengikuti Tes Potensi Akademik (Online), Psikotes, dan wawancara user. Hasil seleksi akan diumumkan maksimal 3 hari kerja setelah wawancara."
        },
        {
            question: "Apakah ada jaminan penyaluran kerja?",
            answer: "LPK PB Merdeka bekerja sama dengan lebih dari 20 Pialang Berjangka resmi di Indonesia. Lulusan dengan predikat 'Memuaskan' akan mendapatkan rekomendasi prioritas untuk penempatan kerja."
        }
    ];

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-12">
            <div className="text-center mb-10">
                <LineHeading title="FAQ Pendaftaran" />
                <p className="text-gray-600 mt-4">
                    Pertanyaan umum seputar proses registrasi dan administrasi.
                </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`border rounded-2xl overflow-hidden transition-all duration-300 ${activeIndex === index ? 'border-red-200 bg-red-50 shadow-md' : 'border-gray-200 bg-white hover:border-red-100'
                            }`}
                    >
                        <button
                            className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                            onClick={() => toggleFAQ(index)}
                        >
                            <span className={`font-bold text-lg ${activeIndex === index ? 'text-red-700' : 'text-gray-800'}`}>
                                {faq.question}
                            </span>
                            <span className={`p-2 rounded-full transition-transform duration-300 ${activeIndex === index ? 'bg-red-200 text-red-700 rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                                {activeIndex === index ? <FaMinus size={14} /> : <FaPlus size={14} />}
                            </span>
                        </button>

                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-red-100/50">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RegistrationFAQSection;
