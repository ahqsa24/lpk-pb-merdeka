import React from 'react';

interface FilterOption {
    id: string;
    label: string;
}

interface GalleryFilterProps {
    filters: FilterOption[];
    activeFilter: string;
    onFilterChange: (id: string) => void;
}

const GalleryFilter: React.FC<GalleryFilterProps> = ({ filters, activeFilter, onFilterChange }) => {
    return (
        <div className="flex flex-wrap justify-center gap-4 mb-16">
            {filters.map(filter => (
                <button
                    key={filter.id}
                    onClick={() => onFilterChange(filter.id)}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeFilter === filter.id
                        ? 'bg-red-600 text-white shadow-lg shadow-red-200 scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
};

export default GalleryFilter;
