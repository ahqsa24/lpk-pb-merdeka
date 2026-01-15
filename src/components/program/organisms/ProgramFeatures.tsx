import React, { useEffect, useState } from 'react';
import { Heading, Button, Paragraph } from "../../shared/atoms";
import { BookOpen, CheckCircle, Monitor, Users, Calendar, Award, Target, GraduationCap } from 'lucide-react';
import Link from 'next/link';

// Icon mapping
const iconMap: { [key: string]: any } = {
    BookOpen, CheckCircle, Monitor, Users, Calendar, Award, Target, GraduationCap
};

interface FeatureItem {
    icon: string;
    title: string;
    description: string;
}

interface CMSData {
    program_why_title?: string;
    program_why_subtitle?: string;
    program_features?: FeatureItem[];
    program_cta_title?: string;
    program_cta_subtitle?: string;
    program_cta_button_text?: string;
    program_cta_button_link?: string;
}

// Default features
const defaultFeatures: FeatureItem[] = [
    {
        icon: 'BookOpen',
        title: 'Modul Premium',
        description: 'Akses perpustakaan materi pembelajaran komprehensif kami, yang diperbarui untuk kondisi pasar 2025.'
    },
    {
        icon: 'CheckCircle',
        title: 'Penilaian Keterampilan',
        description: 'Sistem pre-test dan post-test untuk melacak kemajuan Anda dan memastikan penguasaan setiap topik.'
    },
    {
        icon: 'Monitor',
        title: 'Simulasi Dunia Nyata',
        description: 'Berlatih dengan simulator perdagangan canggih kami sebelum menangani modal sungguhan.'
    },
    {
        icon: 'Users',
        title: 'Kelas Eksklusif',
        description: 'Bergabunglah dalam sesi intim dan terfokus dengan veteran industri dan penasihat top.'
    },
    {
        icon: 'Calendar',
        title: 'Batch Fleksibel',
        description: 'Pilih jadwal yang sesuai dengan kehidupan profesional Anda dengan opsi batch bergilir kami.'
    },
    {
        icon: 'Award',
        title: 'Kompetensi Bersertifikat',
        description: 'Dapatkan sertifikat yang diakui setelah penyelesaian, memvalidasi keahlian Anda sebagai penasihat.'
    }
];

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-600 mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
);

const ProgramFeatures = () => {
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
    const whyTitle = cmsData?.program_why_title || 'Mengapa Memilih Program Kami?';
    const whySubtitle = cmsData?.program_why_subtitle || 'Dapatkan keunggulan kompetitif dengan fasilitas dan metode pembelajaran terbaik di industri.';
    const features = (cmsData?.program_features && cmsData.program_features.length > 0)
        ? cmsData.program_features
        : defaultFeatures;
    const ctaTitle = cmsData?.program_cta_title || 'Siap Memulai Karir Anda?';
    const ctaSubtitle = cmsData?.program_cta_subtitle || 'Bergabunglah dengan ribuan alumni sukses kami dan jadilah penasihat berjangka yang profesional.';
    const ctaButtonText = cmsData?.program_cta_button_text || 'Daftar Sekarang';
    const ctaButtonLink = cmsData?.program_cta_button_link || '/auth/register';

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <Heading className="text-4xl font-extrabold md:text-5xl">{whyTitle}</Heading>
                <Paragraph variant="gray" className="mt-4 text-lg max-w-2xl mx-auto">
                    {whySubtitle}
                </Paragraph>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                    const IconComponent = iconMap[feature.icon] || BookOpen;
                    return (
                        <FeatureCard
                            key={index}
                            icon={<IconComponent />}
                            title={feature.title}
                            description={feature.description}
                        />
                    );
                })}
            </div>

            <div className="mt-16 text-center bg-red-600 rounded-2xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{ctaTitle}</h2>
                    <p className="text-red-100 mb-8 max-w-2xl mx-auto">
                        {ctaSubtitle}
                    </p>
                    <Link href={ctaButtonLink}>
                        <Button variant="secondary" className="bg-white text-red-600 font-bold border-white hover:bg-gray-100 px-8 py-3 text-lg rounded-full">
                            {ctaButtonText}
                        </Button>
                    </Link>
                </div>
                {/* Background Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-red-700 opacity-20 transform -skew-x-12"></div>
            </div>
        </div>
    );
};

export default ProgramFeatures;
