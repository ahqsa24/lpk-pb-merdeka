import React from 'react';
import { FaCheckCircle, FaUserTie, FaGraduationCap } from 'react-icons/fa';
import { Button } from "../../shared/atoms";
import Link from 'next/link';
import { LineHeading } from "../../shared/molecules";

const PricingRequirementsSection = () => {
    return (
        <section className="py-12 mb-12">
            <div className="text-center mb-12">
                <LineHeading title="Biaya & Persyaratan" />
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                    Pilih program yang sesuai dengan jenjang karir Anda di industri berjangka.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Regular Program */}
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 group-hover:bg-gray-400 transition-colors" />
                    <div className="mb-6">
                        <div className="inline-block p-3 bg-gray-100 rounded-2xl mb-4 text-gray-600">
                            <FaUserTie size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Program Reguler</h3>
                        <p className="text-gray-500 mt-2">Dasar-dasar menjadi Wakil Pialang Berjangka.</p>
                    </div>

                    <div className="mb-8">
                        <span className="text-4xl font-extrabold text-gray-900">Rp 7.500.000</span>
                        <span className="text-gray-500">/peserta</span>
                        <p className="text-sm text-gray-500 mt-2 font-medium">Durasi: 2 Bulan (16 Sesi)</p>
                    </div>

                    <ul className="space-y-4 mb-8">
                        {[
                            "Min. Pendidikan D3/S1 Semua Jurusan",
                            "Usia Maksimal 30 Tahun",
                            "Lulus Ujian Saringan Masuk",
                            "Menguasai Ms. Office Dasar",
                            "Komitmen Full-time selama pelatihan"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <FaCheckCircle className="text-gray-400 mt-1 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <Link href="/auth/register" className="block">
                        <Button variant="secondary" className="w-full font-bold py-4 rounded-full justify-center">
                            Daftar Reguler
                        </Button>
                    </Link>
                </div>

                {/* Executive Program */}
                <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden ring-4 ring-red-50">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <FaGraduationCap size={150} />
                    </div>
                    <div className="mb-6 relative z-10">
                        <div className="inline-block p-3 bg-white/20 rounded-2xl mb-4 text-white">
                            <FaGraduationCap size={28} />
                        </div>
                        <h3 className="text-2xl font-bold">Program Eksekutif</h3>
                        <p className="text-red-100 mt-2">Akselerasi untuk profesional karir.</p>
                    </div>

                    <div className="mb-8 relative z-10">
                        <span className="text-4xl font-extrabold">Rp 12.000.000</span>
                        <span className="text-red-200">/peserta</span>
                        <p className="text-sm text-red-100 mt-2 font-medium">Durasi: 3 Bulan (24 Sesi + Mentoring)</p>
                    </div>

                    <ul className="space-y-4 mb-8 relative z-10">
                        {[
                            "Min. Pendidikan S1 Ekonomi/Bisnis",
                            "Usia Maksimal 40 Tahun",
                            "Pengalaman Kerja Min. 2 Tahun",
                            "Interview dengan Board of Directors",
                            "Akses Langsung ke Dealing Room"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <FaCheckCircle className="text-red-200 mt-1 flex-shrink-0" />
                                <span className="text-red-50 text-sm">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <Link href="/auth/register" className="block relative z-10">
                        <Button className="w-full font-bold justify-center bg-white text-red-700 hover:bg-gray-100 border-none py-4 rounded-full shadow-md">
                            Daftar Eksekutif
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PricingRequirementsSection;
