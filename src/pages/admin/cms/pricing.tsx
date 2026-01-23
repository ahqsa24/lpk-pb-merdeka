import React from 'react';
import Head from 'next/head';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { FaMoneyBillWave, FaHardHat } from 'react-icons/fa';

export default function CMSPricing() {
    return (
        <AdminLayout title="CMS: Biaya & Persyaratan">
            <Head>
                <title>Biaya & Persyaratan | CMS Admin</title>
            </Head>

            <div className="w-full">
                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden transition-colors">
                    <div className="p-12 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-full mb-6">
                            <FaHardHat className="text-3xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Coming Soon</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                            Halaman CMS untuk mengelola konten Biaya & Persyaratan sedang dalam pengembangan.
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
