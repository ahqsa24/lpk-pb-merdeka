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
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-12 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full mb-6">
                            <FaHardHat className="text-3xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon</h2>
                        <p className="text-gray-500 max-w-md mx-auto">
                            Halaman CMS untuk mengelola konten Biaya & Persyaratan sedang dalam pengembangan.
                        </p>

                        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100 max-w-lg mx-auto text-left">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <FaMoneyBillWave className="text-green-600" />
                                Fitur yang akan tersedia:
                            </h3>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span>Pengelolaan paket harga pelatihan</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span>Daftar persyaratan pendaftaran</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span>Informasi promo dan diskon</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span>FAQ terkait biaya</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
