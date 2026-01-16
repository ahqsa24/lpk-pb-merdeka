import React, { useEffect, useState } from 'react';
import { FaVideo, FaPlay } from 'react-icons/fa';

interface Video {
    id: string;
    title: string;
    url: string;
    cover_url: string | null;
    duration: number | null;
    description: string | null;
    folder?: {
        name: string;
    };
    created_at: string;
}

export const VideoList: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const res = await fetch('/api/content/videos', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    setVideos(await res.json());
                }
            } catch (error) {
                console.error("Failed to fetch videos", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const getEmbedUrl = (url: string) => {
        // YouTube
        const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([\w-]{11})/);
        if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;

        // Drive
        const driveMatch = url.match(/\/d\/([-\w]{25,})/);
        if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;

        return url;
    };

    if (loading) return <div className="text-center p-8 text-gray-500">Loading videos...</div>;

    if (videos.length === 0) {
        return (
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-12 text-center border border-gray-100 dark:border-zinc-800">
                <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <FaVideo size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Belum ada Video</h3>
                <p className="text-gray-500 mt-2">Video pembelajaran akan segera tersedia.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Video Pembelajaran</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <div key={video.id} className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800 hover:shadow-lg transition-all group flex flex-col h-full">
                        <div
                            className="relative aspect-video bg-gray-900 flex items-center justify-center overflow-hidden cursor-pointer group/video"
                            onClick={() => setActiveVideo(video.url)}
                        >
                            {video.cover_url ? (
                                <img src={video.cover_url} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover/video:opacity-60 transition-opacity" />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-gray-800" />
                            )}

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover/video:scale-110 transition-transform">
                                    <FaPlay className="ml-1" />
                                </div>
                            </div>

                            {video.duration && (
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                    {video.duration} min
                                </div>
                            )}
                        </div>
                        <div className="p-4 flex-1">
                            {video.folder && (
                                <span className="text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded w-fit mb-2 inline-block">
                                    {video.folder.name}
                                </span>
                            )}
                            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                                {video.title}
                            </h3>
                            {video.description && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                    {video.description}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Video Player Modal */}
            {activeVideo && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setActiveVideo(null)}>
                    <div className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl animate-in zoom-in duration-200">
                        <iframe
                            src={getEmbedUrl(activeVideo)}
                            className="w-full h-full"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    <button className="absolute top-4 right-4 text-white text-xl hover:text-gray-300">
                        &times; Close
                    </button>
                </div>
            )}
        </div>
    );
};
