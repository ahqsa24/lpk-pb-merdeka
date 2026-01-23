import React from 'react';
import Head from 'next/head';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { FolderManager } from '@/components/admin/content/FolderManager';

export default function VideosIndex() {
    return (
        <AdminLayout title="Content: Videos">
            <Head>
                <title>Manage Videos | Admin</title>
            </Head>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm p-6 transition-colors">
                <div className="border-b border-gray-100 dark:border-zinc-800 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Video Library</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage training videos from YouTube or Drive organized by folders.</p>
                </div>

                <FolderManager type="video" baseUrl="/admin/content/videos" />
            </div>
        </AdminLayout>
    );
}
