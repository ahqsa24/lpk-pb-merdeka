import React, { useEffect, useState } from 'react';
import { TimelineItem } from "../molecules/TimelineItem";
import { Heading } from "../../shared/atoms";
import { FaChartLine, FaUserTie, FaUsers, FaHandshake, FaSearchDollar, FaLightbulb, FaFileAlt, FaUserFriends } from 'react-icons/fa';

// Icon mapping
const iconMap: { [key: string]: React.ReactNode } = {
    FaChartLine: <FaChartLine />,
    FaUserTie: <FaUserTie />,
    FaUsers: <FaUsers />,
    FaHandshake: <FaHandshake />,
    FaSearchDollar: <FaSearchDollar />,
    FaLightbulb: <FaLightbulb />,
    FaFileAlt: <FaFileAlt />,
    FaUserFriends: <FaUserFriends />,
};

interface CurriculumItem {
    number: string;
    icon: string;
    title: string;
    description: string;
    list: string[];
}

interface CMSData {
    program_curriculum_title?: string;
    program_curriculum_subtitle?: string;
    program_curriculum_items?: CurriculumItem[];
}

// Default data for fallback
const defaultSyllabusData: CurriculumItem[] = [
    {
        number: '01',
        icon: 'FaChartLine',
        title: 'Penguasaan Analisis Pasar',
        description: 'Pelajari cara menganalisis tren pasar dan mengidentifikasi peluang utama dalam perdagangan berjangka komoditi.',
        list: [
            'Memahami dinamika pasar global',
            'Mengidentifikasi sinyal perdagangan',
            'Menganalisis pola data historis'
        ]
    },
    {
        number: '02',
        icon: 'FaUserTie',
        title: 'Kesiapan Profesional',
        description: 'Membangun pola pikir profesional dan ketahanan yang dibutuhkan untuk menghadapi klien bernulai tinggi.',
        list: [
            'Mengembangkan etiket profesional',
            'Membangun ketahanan emosional',
            'Menguasai keterampilan komunikasi'
        ]
    },
    {
        number: '03',
        icon: 'FaUsers',
        title: 'Pemetaan Profil Klien',
        description: 'Kuasai seni memahami toleransi risiko dan tujuan investasi klien.',
        list: [
            'Menilai selera risiko',
            'Menentukan cakrawala investasi',
            'Menyelaraskan tujuan dengan produk'
        ]
    },
    {
        number: '04',
        icon: 'FaHandshake',
        title: 'Perjanjian Penasihat',
        description: 'Pelajari cara menyusun dan melaksanakan perjanjian penasihat yang patuh hukum dan disesuaikan dengan profil klien.',
        list: [
            'Memahami persyaratan hukum',
            'Menyusun perjanjian yang jelas',
            'Mengelola ekspektasi'
        ]
    },
    {
        number: '05',
        icon: 'FaSearchDollar',
        title: 'Analisis Risiko & Peluang',
        description: 'Mendalami perhitungan risiko dan melihat peluang menguntungkan dalam kontrak berjangka.',
        list: [
            'Menghitung rasio risiko-imbalan',
            'Mengidentifikasi implikasi leverage',
            'Melihat peluang arbitrase'
        ]
    },
    {
        number: '06',
        icon: 'FaLightbulb',
        title: 'Rekomendasi Strategis',
        description: 'Kembangkan keterampilan untuk merekomendasikan produk yang tepat berdasarkan data analitis.',
        list: [
            'Merumuskan strategi perdagangan',
            'Memilih instrumen yang tepat',
            'Mendukung rekomendasi dengan data'
        ]
    },
    {
        number: '07',
        icon: 'FaFileAlt',
        title: 'Dokumentasi & Pelaporan',
        description: 'Buat dokumentasi profesional tentang nasihat dan interaksi klien.',
        list: [
            'Menjaga catatan yang akurat',
            'Membuat laporan kinerja',
            'Memastikan kepatuhan terhadap regulasi'
        ]
    },
    {
        number: '08',
        icon: 'FaUserFriends',
        title: 'Manajemen Hubungan',
        description: 'Pelajari strategi untuk memelihara hubungan klien jangka panjang yang menguntungkan.',
        list: [
            'Membangun kepercayaan dan loyalitas',
            'Menangani keberatan klien',
            'Upsell dan cross-sell layanan'
        ]
    }
];

const SyllabusTimeline = () => {
    const [cmsData, setCmsData] = useState<CMSData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/cms/program')
            .then(res => res.json())
            .then(data => {
                if (data && Object.keys(data).length > 0) {
                    setCmsData(data);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    // Use CMS data or fallback
    const curriculumTitle = cmsData?.program_curriculum_title || 'Kurikulum Pelatihan';
    const curriculumSubtitle = cmsData?.program_curriculum_subtitle || 'Program intensif ini dirancang untuk membentuk Wakil Penasihat Berjangka yang kompeten dan profesional.';
    const syllabusData = (cmsData?.program_curriculum_items && cmsData.program_curriculum_items.length > 0)
        ? cmsData.program_curriculum_items
        : defaultSyllabusData;

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            <div className="mb-12 text-center">
                <Heading className="text-4xl font-extrabold md:text-5xl dark:text-white">{curriculumTitle}</Heading>
                <p className="text-gray-600 dark:text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
                    {curriculumSubtitle}
                </p>
            </div>
            <div className="relative">
                {/* Vertical line centered */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-zinc-800" />

                {syllabusData.map((item, index) => (
                    <TimelineItem
                        key={index}
                        number={item.number.padStart(2, '0')}
                        title={item.title}
                        description={item.description}
                        list={item.list || []}
                        position={index % 2 === 0 ? 'left' : 'right'}
                        icon={iconMap[item.icon] || <FaChartLine />}
                    />
                ))}
            </div>
        </div>
    );
};

export default SyllabusTimeline;
