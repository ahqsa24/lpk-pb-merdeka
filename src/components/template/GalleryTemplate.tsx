import React from 'react';
import GallerySection from '../organisms/GallerySection';
import { ScrollReveal } from "../molecules/ScrollReveal";

const GalleryTemplate = () => {
    return (
        <div className="w-full min-h-screen bg-white py-12 md:py-20">
            <div className="container mx-auto px-4">
                {/* Page Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Galeri Kegiatan</h1>
                    <p className="text-lg text-gray-600">
                        Menjelajahi momen-momen berharga dari kegiatan pelatihan, seminar, dan aktivitas komunitas kami.
                    </p>
                </div>
                <ScrollReveal width="100%">
                    <GallerySection />
                </ScrollReveal>
            </div>
        </div>
    );
};

export default GalleryTemplate;
