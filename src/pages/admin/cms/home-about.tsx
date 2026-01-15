import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { FaSave, FaHome, FaSpinner, FaPlus, FaTrash, FaGripVertical } from 'react-icons/fa';
import { Toast } from '@/components/shared/molecules/Toast';

interface GoalItem {
    icon: string;
    title: string;
    description: string;
}

interface StrukturItem {
    number: string;
    title: string;
    description: string;
    list: string[];
    icon: string;
}

const ICON_OPTIONS = [
    { value: 'BookOpen', label: 'Buku' },
    { value: 'Laptop', label: 'Laptop' },
    { value: 'GraduationCap', label: 'Toga' },
    { value: 'Medal', label: 'Medali' },
    { value: 'Target', label: 'Target' },
    { value: 'Users', label: 'Users' },
    { value: 'Briefcase', label: 'Briefcase' },
    { value: 'Award', label: 'Award' },
];

export default function CMSHomeAbout() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'goals' | 'struktur'>('hero');

    // Hero State
    const [hero, setHero] = useState({
        hero_title: '',
        hero_subtitle: '',
        hero_image_url: '',
        hero_cta_text: '',
        hero_cta_link: ''
    });

    // About Intro State
    const [aboutIntro, setAboutIntro] = useState({
        about_intro_title: '',
        about_intro_heading: '',
        about_intro_description: '',
        about_intro_image_url: ''
    });

    // Vision State
    const [vision, setVision] = useState({
        about_vision_title: '',
        about_vision_heading: '',
        about_vision_description: ''
    });

    // Mission State
    const [mission, setMission] = useState({
        about_mission_title: '',
        about_mission_heading: '',
        about_mission_description: ''
    });

    // Goals State (Array)
    const [goals, setGoals] = useState<GoalItem[]>([]);

    // Struktur Program State (Array)
    const [struktur, setStruktur] = useState<StrukturItem[]>([]);

    // Toast
    const [toast, setToast] = useState({ isOpen: false, message: '', type: 'info' as 'success' | 'error' | 'info' });

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/admin/cms/home-about', { headers: getAuthHeaders() });
                if (res.ok) {
                    const data = await res.json();

                    setHero({
                        hero_title: data.hero_title || '',
                        hero_subtitle: data.hero_subtitle || '',
                        hero_image_url: data.hero_image_url || '',
                        hero_cta_text: data.hero_cta_text || '',
                        hero_cta_link: data.hero_cta_link || ''
                    });

                    setAboutIntro({
                        about_intro_title: data.about_intro_title || '',
                        about_intro_heading: data.about_intro_heading || '',
                        about_intro_description: data.about_intro_description || '',
                        about_intro_image_url: data.about_intro_image_url || ''
                    });

                    setVision({
                        about_vision_title: data.about_vision_title || '',
                        about_vision_heading: data.about_vision_heading || '',
                        about_vision_description: data.about_vision_description || ''
                    });

                    setMission({
                        about_mission_title: data.about_mission_title || '',
                        about_mission_heading: data.about_mission_heading || '',
                        about_mission_description: data.about_mission_description || ''
                    });

                    setGoals(Array.isArray(data.about_goals) ? data.about_goals : []);
                    setStruktur(Array.isArray(data.about_struktur) ? data.about_struktur : []);
                }
            } catch (error) {
                console.error('Failed to fetch', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async () => {
        setSaving(true);
        try {
            const payload = {
                ...hero,
                ...aboutIntro,
                ...vision,
                ...mission,
                about_goals: goals,
                about_struktur: struktur
            };

            const res = await fetch('/api/admin/cms/home-about', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setToast({ isOpen: true, message: 'Content saved successfully!', type: 'success' });
            } else {
                setToast({ isOpen: true, message: 'Failed to save content', type: 'error' });
            }
        } catch (error) {
            setToast({ isOpen: true, message: 'Error saving content', type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const addGoal = () => {
        setGoals([...goals, { icon: 'BookOpen', title: '', description: '' }]);
        setToast({ isOpen: true, message: 'Goal added', type: 'info' });
    };

    const removeGoal = (index: number) => {
        setGoals(goals.filter((_, i) => i !== index));
        setToast({ isOpen: true, message: 'Goal removed', type: 'info' });
    };

    const updateGoal = (index: number, field: keyof GoalItem, value: string) => {
        const updated = [...goals];
        updated[index][field] = value;
        setGoals(updated);
    };

    const addStruktur = () => {
        setStruktur([...struktur, { number: String(struktur.length + 1), title: '', description: '', list: [''], icon: 'Book' }]);
        setToast({ isOpen: true, message: 'Stage added', type: 'info' });
    };

    const removeStruktur = (index: number) => {
        setStruktur(struktur.filter((_, i) => i !== index));
        setToast({ isOpen: true, message: 'Stage removed', type: 'info' });
    };

    const updateStruktur = (index: number, field: keyof StrukturItem, value: any) => {
        const updated = [...struktur];
        updated[index] = { ...updated[index], [field]: value };
        setStruktur(updated);
    };

    const updateStrukturList = (sIndex: number, lIndex: number, value: string) => {
        const updated = [...struktur];
        updated[sIndex].list[lIndex] = value;
        setStruktur(updated);
    };

    const addStrukturListItem = (sIndex: number) => {
        const updated = [...struktur];
        updated[sIndex].list.push('');
        setStruktur(updated);
    };

    const removeStrukturListItem = (sIndex: number, lIndex: number) => {
        const updated = [...struktur];
        updated[sIndex].list = updated[sIndex].list.filter((_, i) => i !== lIndex);
        setStruktur(updated);
    };

    const STRUKTUR_ICON_OPTIONS = [
        { value: 'Book', label: 'Book' },
        { value: 'ClipboardCheck', label: 'Clipboard' },
        { value: 'Medal', label: 'Medal' },
        { value: 'Award', label: 'Award' },
        { value: 'GraduationCap', label: 'Graduation Cap' },
    ];

    const tabs = [
        { id: 'hero', label: 'Hero Section' },
        { id: 'about', label: 'About Us' },
        { id: 'goals', label: 'Goals' },
        { id: 'struktur', label: 'Program Structure' }
    ];

    return (
        <AdminLayout title="CMS: Home & About">
            <Head>
                <title>Home & About | CMS Admin</title>
            </Head>

            <div className="w-full space-y-6">
                {/* Tabs */}
                <div className="bg-white rounded-xl border border-gray-100 p-1 flex gap-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${activeTab === tab.id
                                ? 'bg-red-600 text-white shadow-lg'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-gray-500">
                            <FaSpinner className="animate-spin mx-auto text-2xl mb-2" />
                            Loading...
                        </div>
                    ) : (
                        <div className="p-6 space-y-8">
                            {/* HERO TAB */}
                            {activeTab === 'hero' && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                        <div className="p-2 bg-red-100 text-red-600 rounded-lg"><FaHome /></div>
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-800">Hero Section (Homepage)</h2>
                                            <p className="text-sm text-gray-500">Manage the main landing page display</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
                                            <input
                                                type="text"
                                                value={hero.hero_title}
                                                onChange={e => setHero({ ...hero, hero_title: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                placeholder="Strong Competence, Great Future"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                                            <textarea
                                                rows={3}
                                                value={hero.hero_subtitle}
                                                onChange={e => setHero({ ...hero, hero_subtitle: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                placeholder="Lembaga pelatihan resmi di bidang perdagangan berjangka..."
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image URL</label>
                                            <input
                                                type="text"
                                                value={hero.hero_image_url}
                                                onChange={e => setHero({ ...hero, hero_image_url: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
                                            <input
                                                type="text"
                                                value={hero.hero_cta_text}
                                                onChange={e => setHero({ ...hero, hero_cta_text: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                placeholder="Register Program"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Link</label>
                                            <input
                                                type="text"
                                                value={hero.hero_cta_link}
                                                onChange={e => setHero({ ...hero, hero_cta_link: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                placeholder="/auth/register"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ABOUT TAB */}
                            {activeTab === 'about' && (
                                <div className="space-y-8">
                                    {/* Intro Section */}
                                    <div className="space-y-6">
                                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">Intro / About Us</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Label Badge</label>
                                                <input
                                                    type="text"
                                                    value={aboutIntro.about_intro_title}
                                                    onChange={e => setAboutIntro({ ...aboutIntro, about_intro_title: e.target.value })}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                    placeholder="Tentang Kami"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
                                                <input
                                                    type="text"
                                                    value={aboutIntro.about_intro_heading}
                                                    onChange={e => setAboutIntro({ ...aboutIntro, about_intro_heading: e.target.value })}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                    placeholder="Apa Itu LPK PB Merdeka?"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                                                <textarea
                                                    rows={4}
                                                    value={aboutIntro.about_intro_description}
                                                    onChange={e => setAboutIntro({ ...aboutIntro, about_intro_description: e.target.value })}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                    placeholder="Lembaga Pelatihan Kompetensi..."
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
                                                <input
                                                    type="text"
                                                    value={aboutIntro.about_intro_image_url}
                                                    onChange={e => setAboutIntro({ ...aboutIntro, about_intro_image_url: e.target.value })}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Vision Section */}
                                    <div className="space-y-6">
                                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">Visi</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                                                <input
                                                    type="text"
                                                    value={vision.about_vision_title}
                                                    onChange={e => setVision({ ...vision, about_vision_title: e.target.value })}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                    placeholder="Visi LPK PB Merdeka"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
                                                <input
                                                    type="text"
                                                    value={vision.about_vision_heading}
                                                    onChange={e => setVision({ ...vision, about_vision_heading: e.target.value })}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                    placeholder="Sejuta digital talent..."
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                                                <textarea
                                                    rows={3}
                                                    value={vision.about_vision_description}
                                                    onChange={e => setVision({ ...vision, about_vision_description: e.target.value })}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mission Section */}
                                    <div className="space-y-6">
                                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">Misi</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                                                <input
                                                    type="text"
                                                    value={mission.about_mission_title}
                                                    onChange={e => setMission({ ...mission, about_mission_title: e.target.value })}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                    placeholder="Misi LPK PB Merdeka"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
                                                <input
                                                    type="text"
                                                    value={mission.about_mission_heading}
                                                    onChange={e => setMission({ ...mission, about_mission_heading: e.target.value })}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                    placeholder="To train, certify, and connect..."
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                                                <textarea
                                                    rows={3}
                                                    value={mission.about_mission_description}
                                                    onChange={e => setMission({ ...mission, about_mission_description: e.target.value })}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* GOALS TAB */}
                            {activeTab === 'goals' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-800">Tujuan</h2>
                                            <p className="text-sm text-gray-500">Kelola daftar tujuan yang ditampilkan</p>
                                        </div>
                                        <button
                                            onClick={addGoal}
                                            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
                                        >
                                            <FaPlus /> Tambah Tujuan
                                        </button>
                                    </div>

                                    {goals.length === 0 ? (
                                        <div className="p-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                            <p className="text-gray-500">Belum ada tujuan. Klik tombol "Tambah Tujuan" untuk menambahkan.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {goals.map((goal, index) => (
                                                <div key={index} className="p-4 border border-gray-200 rounded-xl bg-gray-50 space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2 text-gray-400">
                                                            <FaGripVertical />
                                                            <span className="font-medium text-gray-700">Tujuan #{index + 1}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => removeGoal(index)}
                                                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                                            <select
                                                                value={goal.icon}
                                                                onChange={e => updateGoal(index, 'icon', e.target.value)}
                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                                            >
                                                                {ICON_OPTIONS.map(opt => (
                                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                                                            <input
                                                                type="text"
                                                                value={goal.title}
                                                                onChange={e => updateGoal(index, 'title', e.target.value)}
                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                                                placeholder="Kurikulum Industri"
                                                            />
                                                        </div>
                                                        <div className="md:col-span-3">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                                                            <textarea
                                                                rows={2}
                                                                value={goal.description}
                                                                onChange={e => updateGoal(index, 'description', e.target.value)}
                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                                                placeholder="Deskripsi singkat..."
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* STRUKTUR PROGRAM TAB */}
                            {activeTab === 'struktur' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-800">Struktur Program</h2>
                                            <p className="text-sm text-gray-500">Kelola tahapan program pelatihan (timeline)</p>
                                        </div>
                                        <button
                                            onClick={addStruktur}
                                            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
                                        >
                                            <FaPlus /> Tambah Tahap
                                        </button>
                                    </div>

                                    {struktur.length === 0 ? (
                                        <div className="p-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                            <p className="text-gray-500">Belum ada tahapan. Klik "Tambah Tahap" untuk menambahkan.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {struktur.map((item, sIndex) => (
                                                <div key={sIndex} className="p-5 border border-gray-200 rounded-xl bg-gray-50 space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center font-bold">
                                                                {item.number}
                                                            </div>
                                                            <span className="font-medium text-gray-700">Tahap {item.number}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => removeStruktur(sIndex)}
                                                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor</label>
                                                            <input
                                                                type="text"
                                                                value={item.number}
                                                                onChange={e => updateStruktur(sIndex, 'number', e.target.value)}
                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                                                placeholder="1"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                                            <select
                                                                value={item.icon}
                                                                onChange={e => updateStruktur(sIndex, 'icon', e.target.value)}
                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                                            >
                                                                {STRUKTUR_ICON_OPTIONS.map(opt => (
                                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Tahap</label>
                                                            <input
                                                                type="text"
                                                                value={item.title}
                                                                onChange={e => updateStruktur(sIndex, 'title', e.target.value)}
                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                                                placeholder="Tahap Pelatihan"
                                                            />
                                                        </div>
                                                        <div className="md:col-span-3">
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                                                            <textarea
                                                                rows={2}
                                                                value={item.description}
                                                                onChange={e => updateStruktur(sIndex, 'description', e.target.value)}
                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                                                placeholder="Deskripsi tahap ini..."
                                                            />
                                                        </div>
                                                        <div className="md:col-span-3 space-y-2">
                                                            <div className="flex items-center justify-between">
                                                                <label className="block text-sm font-medium text-gray-700">List Item</label>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => addStrukturListItem(sIndex)}
                                                                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                                                                >
                                                                    + Tambah Item
                                                                </button>
                                                            </div>
                                                            {item.list.map((listItem, lIndex) => (
                                                                <div key={lIndex} className="flex gap-2">
                                                                    <input
                                                                        type="text"
                                                                        value={listItem}
                                                                        onChange={e => updateStrukturList(sIndex, lIndex, e.target.value)}
                                                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none text-sm"
                                                                        placeholder={`Item ${lIndex + 1}`}
                                                                    />
                                                                    {item.list.length > 1 && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => removeStrukturListItem(sIndex, lIndex)}
                                                                            className="text-gray-400 hover:text-red-500 p-2"
                                                                        >
                                                                            <FaTrash size={12} />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Save Button */}
                            <div className="pt-6 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={handleSubmit}
                                    disabled={saving}
                                    className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                                    Save All
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Toast
                isOpen={toast.isOpen}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, isOpen: false })}
            />
        </AdminLayout>
    );
}
