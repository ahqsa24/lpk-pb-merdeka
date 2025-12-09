import React, { useState } from 'react';
import GalleryItem, { GalleryItemProps } from '../molecules/GalleryItem';
import GalleryFilter from '../molecules/GalleryFilter';
import { Heading, Paragraph } from '../atoms';

const galleryItems: GalleryItemProps[] = [
    {
        id: 1,
        type: 'photo',
        category: 'training',
        title: "Pelatihan Analisis Teknikal Lanjutan",
        date: "12 Okt 2023",
        image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: 2,
        type: 'video',
        category: 'activity',
        title: "Kunjungan ke Bursa Berjangka Jakarta",
        date: "15 Okt 2023",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: 3,
        type: 'photo',
        category: 'ceremony',
        title: "Wisuda Angkatan 5 Broker Muda",
        date: "20 Okt 2023",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: 4,
        type: 'photo',
        category: 'culture',
        title: "Gathering Komunitas Trader",
        date: "25 Okt 2023",
        image: "https://images.unsplash.com/photo-1528605205643-26409612d350?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: 5,
        type: 'video',
        category: 'training',
        title: "Simulasi Live Trading NFP",
        date: "01 Nov 2023",
        image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: 6,
        type: 'photo',
        category: 'activity',
        title: "Seminar Outlook Ekonomi 2024",
        date: "05 Nov 2023",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: 7,
        type: 'photo',
        category: 'training',
        title: "Kelas Manajemen Risiko",
        date: "10 Nov 2023",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: 8,
        type: 'video',
        category: 'culture',
        title: "Networking Dinner dengan Pakar Industri",
        date: "15 Nov 2023",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600&auto=format&fit=crop",
    }
];

const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'photo', label: 'Foto' },
    { id: 'video', label: 'Video' }
];

const GallerySection = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredItems = galleryItems.filter(item => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'photo' || activeFilter === 'video') return item.type === activeFilter;
        return item.category === activeFilter;
    });

    return (
        <section className="bg-white py-20 min-h-screen">
            <div className="container mx-auto px-6 lg:px-12 xl:px-24">

                {/* Header */}
                <div className="text-center mb-12">
                    <Heading className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">Galeri Kami</Heading>
                    <Paragraph className="text-gray-600 max-w-2xl mx-auto">
                        Momen-momen berharga dari kegiatan pelatihan, budaya, dan keseruan siswa LPK PB Merdeka.
                    </Paragraph>
                </div>

                {/* Filters */}
                <GalleryFilter
                    filters={categories}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />

                {/* Masonry Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {filteredItems.map(item => (
                        <GalleryItem key={item.id} {...item} />
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p>Tidak ada media ditemukan untuk kategori ini.</p>
                    </div>
                )}

            </div>
        </section>
    );
};

export default GallerySection;
