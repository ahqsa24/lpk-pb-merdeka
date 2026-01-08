import React, { useState } from 'react';
import AccordionItem from "../molecules/AccordionItem";
import { Heading } from "../../shared/atoms";

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            title: 'Apa syarat untuk mendaftar program ini?',
            content: 'Minimal lulusan SMA/Sederajat, memiliki ketertarikan di bidang keuangan dan investasi, serta bersedia mengikuti seluruh rangkaian pelatihan secara penuh.'
        },
        {
            title: 'Berapa lama durasi pelatihannya?',
            content: 'Program pelatihan reguler berlangsung selama 3 bulan, tediri dari 1 bulan materi intensif di kelas dan 2 bulan praktik simulasi serta magang.'
        },
        {
            title: 'Apakah ada biaya pendaftaran?',
            content: 'Untuk informasi detail mengenai biaya investasi pendidikan dan opsi cicilan atau beasiswa, silakan hubungi tim admisi kami melalui formulir kontak.'
        },
        {
            title: 'Apakah lulusan dijamin kerja?',
            content: 'Kami memiliki kemitraan dengan berbagai perusahaan pialang berjangka terkemuka. Lulusan terbaik akan mendapatkan rekomendasi penempatan kerja prioritas.'
        },
        {
            title: 'Apakah sertifikatnya diakui secara nasional?',
            content: 'Ya, LPK PB Merdeka terakreditasi dan sertifikat kompetensi yang kami keluarkan diakui oleh Bappebti dan asosiasi terkait.'
        }
    ];

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full">
            <div className="mb-8">
                <Heading className="text-2xl mb-2">Frequently Asked Questions (FAQ)</Heading>
                <p className="text-gray-500 text-sm">Jawaban cepat untuk pertanyaan umum seputar program kami.</p>
            </div>

            <div className="space-y-1">
                {faqs.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        title={faq.title}
                        content={faq.content}
                        isOpen={openIndex === index}
                        onClick={() => handleToggle(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FAQSection;
