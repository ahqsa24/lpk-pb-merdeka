import React from 'react';
import Image from 'next/image';
import { FaPlay, FaCamera } from 'react-icons/fa';

export type GalleryType = 'photo' | 'video';
export type GalleryCategory = 'activity' | 'ceremony' | 'training' | 'culture';

export interface GalleryItemProps {
    id: number;
    type: GalleryType;
    category: GalleryCategory;
    title: string;
    date: string;
    image: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ type, category, title, date, image }) => {
    return (
        <div className="relative group break-inside-avoid rounded-2xl overflow-hidden bg-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer">
            {/* Image */}
            <div className="relative w-full">
                <Image
                    src={image}
                    alt={title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Type Icon (Top Right) */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white border border-white/30">
                    {type === 'video' ? <FaPlay size={12} className="ml-0.5" /> : <FaCamera size={14} />}
                </div>

                {/* Content (Bottom) */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-lg mb-2">
                        {category.toUpperCase()}
                    </span>
                    <h3 className="text-white font-bold text-lg leading-tight mb-1">
                        {title}
                    </h3>
                    <p className="text-gray-300 text-sm">{date}</p>
                </div>

                {/* Centered Play Button for Video */}
                {type === 'video' && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white border-2 border-white group-hover:scale-110 transition-transform duration-300">
                        <FaPlay size={24} className="ml-1" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GalleryItem;
