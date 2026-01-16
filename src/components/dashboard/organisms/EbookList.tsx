import React, { useEffect, useState } from 'react';
import { FaBook, FaDownload } from 'react-icons/fa';

interface Ebook {
    id: string;
    title: string;
    file_url: string;
    cover_url: string | null;
    description: string | null;
    folder?: {
        name: string;
    };
    created_at: string;
}

export const EbookList: React.FC = () => {
    const [ebooks, setEbooks] = useState<Ebook[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEbooks = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const res = await fetch('/api/content/ebooks', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    setEbooks(await res.json());
                }
            } catch (error) {
                console.error("Failed to fetch ebooks", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEbooks();
    }, []);

    if (loading) return <div className="text-center p-8 text-gray-500">Loading ebooks...</div>;

    if (ebooks.length === 0) {
        return (
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-12 text-center border border-gray-100 dark:border-zinc-800">
                <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <FaBook size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Belum ada E-Book</h3>
                <p className="text-gray-500 mt-2">Materi pembelajaran akan segera tersedia.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Materi Pembelajaran (E-Book)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {ebooks.map((ebook) => (
                    <div key={ebook.id} className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800 hover:shadow-lg transition-all group flex flex-col h-full">
                        <div className="relative h-48 bg-gray-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                            {ebook.cover_url ? (
                                <img src={ebook.cover_url} alt={ebook.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <FaBook className="text-gray-400 text-4xl" />
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            {ebook.folder && (
                                <span className="text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded w-fit mb-2">
                                    {ebook.folder.name}
                                </span>
                            )}
                            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                                {ebook.title}
                            </h3>
                            {ebook.description && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-1">
                                    {ebook.description}
                                </p>
                            )}
                            <a
                                href={ebook.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-auto w-full bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors border border-gray-200 dark:border-zinc-700"
                            >
                                <FaDownload size={12} /> Download / Baca
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
