import React from 'react';
import { TimelineItem } from "../molecules/TimelineItem";
import { Heading } from "../../shared/atoms";
import { FaChartLine, FaUserTie, FaUsers, FaHandshake, FaSearchDollar, FaLightbulb, FaFileAlt, FaUserFriends } from 'react-icons/fa';

const SyllabusTimeline = () => {
    const syllabusData = [
        {
            number: '01',
            title: 'Penguasaan Analisis Pasar',
            description: 'Pelajari cara menganalisis tren pasar dan mengidentifikasi peluang utama dalam perdagangan berjangka komoditi.',
            list: [
                'Memahami dinamika pasar global',
                'Mengidentifikasi sinyal perdagangan',
                'Menganalisis pola data historis'
            ],
            icon: <FaChartLine />
        },
        {
            number: '02',
            title: 'Kesiapan Profesional',
            description: 'Membangun pola pikir profesional dan ketahanan yang dibutuhkan untuk menghadapi klien bernulai tinggi.',
            list: [
                'Mengembangkan etiket profesional',
                'Membangun ketahanan emosional',
                'Menguasai keterampilan komunikasi'
            ],
            icon: <FaUserTie />
        },
        {
            number: '03',
            title: 'Pemetaan Profil Klien',
            description: 'Kuasai seni memahami toleransi risiko dan tujuan investasi klien.',
            list: [
                'Menilai selera risiko',
                'Menentukan cakrawala investasi',
                'Menyelaraskan tujuan dengan produk'
            ],
            icon: <FaUsers />
        },
        {
            number: '04',
            title: 'Perjanjian Penasihat',
            description: 'Pelajari cara menyusun dan melaksanakan perjanjian penasihat yang patuh hukum dan disesuaikan dengan profil klien.',
            list: [
                'Memahami persyaratan hukum',
                'Menyusun perjanjian yang jelas',
                'Mengelola ekspektasi'
            ],
            icon: <FaHandshake />
        },
        {
            number: '05',
            title: 'Analisis Risiko & Peluang',
            description: 'Mendalami perhitungan risiko dan melihat peluang menguntungkan dalam kontrak berjangka.',
            list: [
                'Menghitung rasio risiko-imbalan',
                'Mengidentifikasi implikasi leverage',
                'Melihat peluang arbitrase'
            ],
            icon: <FaSearchDollar />
        },
        {
            number: '06',
            title: 'Rekomendasi Strategis',
            description: 'Kembangkan keterampilan untuk merekomendasikan produk yang tepat berdasarkan data analitis.',
            list: [
                'Merumuskan strategi perdagangan',
                'Memilih instrumen yang tepat',
                'Mendukung rekomendasi dengan data'
            ],
            icon: <FaLightbulb />
        },
        {
            number: '07',
            title: 'Dokumentasi & Pelaporan',
            description: 'Buat dokumentasi profesional tentang nasihat dan interaksi klien.',
            list: [
                'Menjaga catatan yang akurat',
                'Membuat laporan kinerja',
                'Memastikan kepatuhan terhadap regulasi'
            ],
            icon: <FaFileAlt />
        },
        {
            number: '08',
            title: 'Manajemen Hubungan',
            description: 'Pelajari strategi untuk memelihara hubungan klien jangka panjang yang menguntungkan.',
            list: [
                'Membangun kepercayaan dan loyalitas',
                'Menangani keberatan klien',
                'Upsell dan cross-sell layanan'
            ],
            icon: <FaUserFriends />
        }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            <div className="mb-12 text-center">
                <Heading className="text-4xl font-extrabold md:text-5xl ">Kurikulum Pelatihan</Heading>
                <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
                    Program intensif ini dirancang untuk membentuk Wakil Penasihat Berjangka yang kompeten dan profesional.
                </p>
            </div>
            <div className="relative">
                {/* Vertical line centered */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200" />

                {syllabusData.map((item, index) => (
                    <TimelineItem
                        key={index}
                        number={item.number}
                        title={item.title}
                        description={item.description}
                        list={item.list}
                        position={index % 2 === 0 ? 'left' : 'right'}
                        icon={item.icon}
                    />
                ))}
            </div>
        </div>
    );
};

export default SyllabusTimeline;
