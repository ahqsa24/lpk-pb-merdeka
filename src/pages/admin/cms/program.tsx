import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { FaSave, FaSpinner, FaPlus, FaTrash, FaGripVertical } from 'react-icons/fa';
import { Toast } from '@/components/shared/molecules/Toast';

interface FeatureItem {
    icon: string;
    title: string;
    description: string;
}

interface CurriculumItem {
    number: string;
    icon: string;
    title: string;
    description: string;
    list: string[];
}

const CURRICULUM_ICON_OPTIONS = [
    { value: 'FaChartLine', label: 'Chart Line' },
    { value: 'FaUserTie', label: 'User Tie' },
    { value: 'FaUsers', label: 'Users' },
    { value: 'FaHandshake', label: 'Handshake' },
    { value: 'FaSearchDollar', label: 'Search Dollar' },
    { value: 'FaLightbulb', label: 'Lightbulb' },
    { value: 'FaFileAlt', label: 'File Alt' },
    { value: 'FaUserFriends', label: 'User Friends' },
];

const ICON_OPTIONS = [
    { value: 'BookOpen', label: 'Book' },
    { value: 'CheckCircle', label: 'Check' },
    { value: 'Monitor', label: 'Monitor' },
    { value: 'Users', label: 'Users' },
    { value: 'Calendar', label: 'Calendar' },
    { value: 'Award', label: 'Award' },
    { value: 'Target', label: 'Target' },
    { value: 'GraduationCap', label: 'Graduation Cap' },
];

export default function CMSProgram() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'features' | 'curriculum' | 'cta'>('features');

    // Why Choose Section
    const [whySection, setWhySection] = useState({
        program_why_title: '',
        program_why_subtitle: ''
    });

    // Features (Array)
    const [features, setFeatures] = useState<FeatureItem[]>([]);

    // Curriculum Section
    const [curriculumSection, setCurriculumSection] = useState({
        program_curriculum_title: '',
        program_curriculum_subtitle: ''
    });

    // Curriculum Items (Array)
    const [curriculumItems, setCurriculumItems] = useState<CurriculumItem[]>([]);

    // CTA Section
    const [ctaSection, setCtaSection] = useState({
        program_cta_title: '',
        program_cta_subtitle: '',
        program_cta_button_text: '',
        program_cta_button_link: ''
    });

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
                const res = await fetch('/api/admin/cms/program', { headers: getAuthHeaders() });
                if (res.ok) {
                    const data = await res.json();

                    setWhySection({
                        program_why_title: data.program_why_title || '',
                        program_why_subtitle: data.program_why_subtitle || ''
                    });

                    setFeatures(Array.isArray(data.program_features) ? data.program_features : []);

                    setCurriculumSection({
                        program_curriculum_title: data.program_curriculum_title || '',
                        program_curriculum_subtitle: data.program_curriculum_subtitle || ''
                    });

                    setCurriculumItems(Array.isArray(data.program_curriculum_items) ? data.program_curriculum_items : []);

                    setCtaSection({
                        program_cta_title: data.program_cta_title || '',
                        program_cta_subtitle: data.program_cta_subtitle || '',
                        program_cta_button_text: data.program_cta_button_text || '',
                        program_cta_button_link: data.program_cta_button_link || ''
                    });
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
                ...whySection,
                program_features: features,
                ...curriculumSection,
                program_curriculum_items: curriculumItems,
                ...ctaSection
            };

            const res = await fetch('/api/admin/cms/program', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setToast({ isOpen: true, message: 'Program content saved successfully!', type: 'success' });
            } else {
                setToast({ isOpen: true, message: 'Failed to save content', type: 'error' });
            }
        } catch (error) {
            setToast({ isOpen: true, message: 'Error saving content', type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    // Feature handlers
    const addFeature = () => {
        setFeatures([...features, { icon: 'BookOpen', title: '', description: '' }]);
        setToast({ isOpen: true, message: 'Feature added', type: 'info' });
    };

    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
        setToast({ isOpen: true, message: 'Feature removed', type: 'info' });
    };

    const updateFeature = (index: number, field: keyof FeatureItem, value: string) => {
        const updated = [...features];
        updated[index][field] = value;
        setFeatures(updated);
    };

    // Curriculum handlers
    const addCurriculumItem = () => {
        const newNumber = String(curriculumItems.length + 1);
        setCurriculumItems([...curriculumItems, { number: newNumber, icon: 'FaChartLine', title: '', description: '', list: [''] }]);
        setToast({ isOpen: true, message: 'Curriculum item added', type: 'info' });
    };

    const removeCurriculumItem = (index: number) => {
        setCurriculumItems(curriculumItems.filter((_, i) => i !== index));
        setToast({ isOpen: true, message: 'Curriculum item removed', type: 'info' });
    };

    const updateCurriculumItem = (index: number, field: keyof CurriculumItem, value: string | string[]) => {
        const updated = [...curriculumItems];
        (updated[index][field] as any) = value;
        setCurriculumItems(updated);
    };

    // Curriculum List Item handlers
    const addCurriculumListItem = (curriculumIndex: number) => {
        const updated = [...curriculumItems];
        updated[curriculumIndex].list = [...(updated[curriculumIndex].list || []), ''];
        setCurriculumItems(updated);
    };

    const removeCurriculumListItem = (curriculumIndex: number, listIndex: number) => {
        const updated = [...curriculumItems];
        updated[curriculumIndex].list = updated[curriculumIndex].list.filter((_, i) => i !== listIndex);
        setCurriculumItems(updated);
    };

    const updateCurriculumList = (curriculumIndex: number, listIndex: number, value: string) => {
        const updated = [...curriculumItems];
        updated[curriculumIndex].list[listIndex] = value;
        setCurriculumItems(updated);
    };

    const tabs = [
        { id: 'features', label: 'Why Choose Us' },
        { id: 'curriculum', label: 'Curriculum' },
        { id: 'cta', label: 'Call to Action' }
    ];

    return (
        <AdminLayout title="CMS: Program">
            <Head>
                <title>Program | CMS Admin</title>
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
                            {/* FEATURES TAB */}
                            {activeTab === 'features' && (
                                <div className="space-y-6">
                                    {/* Section Header */}
                                    <div className="space-y-4 pb-6 border-b border-gray-100">
                                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Header Section</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                                <input
                                                    type="text"
                                                    value={whySection.program_why_title}
                                                    onChange={e => setWhySection({ ...whySection, program_why_title: e.target.value })}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                    placeholder="Why Choose Our Program?"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                                                <textarea
                                                    rows={2}
                                                    value={whySection.program_why_subtitle}
                                                    onChange={e => setWhySection({ ...whySection, program_why_subtitle: e.target.value })}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                    placeholder="Get competitive advantage..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Features List */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Program Features</h3>
                                            <button
                                                onClick={addFeature}
                                                className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition text-sm"
                                            >
                                                <FaPlus /> Add Feature
                                            </button>
                                        </div>

                                        {features.length === 0 ? (
                                            <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                                <p className="text-gray-500">No features yet. Click "Add Feature" to add one.</p>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {features.map((feature, index) => (
                                                    <div key={index} className="p-4 border border-gray-200 rounded-xl bg-gray-50 space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2 text-gray-400">
                                                                <FaGripVertical />
                                                                <span className="font-medium text-gray-700 text-sm">Feature #{index + 1}</span>
                                                            </div>
                                                            <button
                                                                onClick={() => removeFeature(index)}
                                                                className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition"
                                                            >
                                                                <FaTrash size={12} />
                                                            </button>
                                                        </div>

                                                        <div className="space-y-3">
                                                            <div className="grid grid-cols-3 gap-2">
                                                                <select
                                                                    value={feature.icon}
                                                                    onChange={e => updateFeature(index, 'icon', e.target.value)}
                                                                    className="border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-red-500 outline-none text-sm"
                                                                >
                                                                    {ICON_OPTIONS.map(opt => (
                                                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                                    ))}
                                                                </select>
                                                                <input
                                                                    type="text"
                                                                    value={feature.title}
                                                                    onChange={e => updateFeature(index, 'title', e.target.value)}
                                                                    className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none text-sm"
                                                                    placeholder="Feature Title"
                                                                />
                                                            </div>
                                                            <textarea
                                                                rows={2}
                                                                value={feature.description}
                                                                onChange={e => updateFeature(index, 'description', e.target.value)}
                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none text-sm"
                                                                placeholder="Short description..."
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* CURRICULUM TAB */}
                            {activeTab === 'curriculum' && (
                                <div className="space-y-6">
                                    {/* Section Header */}
                                    <div className="space-y-4 pb-6 border-b border-gray-100">
                                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Header Section</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                                <input
                                                    type="text"
                                                    value={curriculumSection.program_curriculum_title}
                                                    onChange={e => setCurriculumSection({ ...curriculumSection, program_curriculum_title: e.target.value })}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                    placeholder="Training Curriculum"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                                                <textarea
                                                    rows={2}
                                                    value={curriculumSection.program_curriculum_subtitle}
                                                    onChange={e => setCurriculumSection({ ...curriculumSection, program_curriculum_subtitle: e.target.value })}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                    placeholder="What you will learn..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Curriculum Items */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Curriculum Stages</h3>
                                            <button
                                                onClick={addCurriculumItem}
                                                className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition text-sm"
                                            >
                                                <FaPlus /> Add Syllabus
                                            </button>
                                        </div>

                                        {curriculumItems.length === 0 ? (
                                            <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                                <p className="text-gray-500">No curriculum stages yet. Click "Add Syllabus" to add one.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                {curriculumItems.map((item, index) => (
                                                    <div key={index} className="p-5 border border-gray-200 rounded-xl bg-gray-50 space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center font-bold">
                                                                    {item.number || index + 1}
                                                                </div>
                                                                <span className="font-medium text-gray-700">Syllabus {item.number || index + 1}</span>
                                                            </div>
                                                            <button
                                                                onClick={() => removeCurriculumItem(index)}
                                                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
                                                                <input
                                                                    type="text"
                                                                    value={item.number}
                                                                    onChange={e => updateCurriculumItem(index, 'number', e.target.value)}
                                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                                                    placeholder="1"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                                                <select
                                                                    value={item.icon}
                                                                    onChange={e => updateCurriculumItem(index, 'icon', e.target.value)}
                                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                                                >
                                                                    {CURRICULUM_ICON_OPTIONS.map(opt => (
                                                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Stage Title</label>
                                                                <input
                                                                    type="text"
                                                                    value={item.title}
                                                                    onChange={e => updateCurriculumItem(index, 'title', e.target.value)}
                                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                                                    placeholder="Training Stage"
                                                                />
                                                            </div>
                                                            <div className="md:col-span-3">
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                                                <textarea
                                                                    rows={2}
                                                                    value={item.description}
                                                                    onChange={e => updateCurriculumItem(index, 'description', e.target.value)}
                                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                                                    placeholder="Description of this stage..."
                                                                />
                                                            </div>
                                                            <div className="md:col-span-3 space-y-2">
                                                                <div className="flex items-center justify-between">
                                                                    <label className="block text-sm font-medium text-gray-700">List Item</label>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => addCurriculumListItem(index)}
                                                                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                                                                    >
                                                                        + Add Item
                                                                    </button>
                                                                </div>
                                                                {(item.list || []).map((listItem, lIndex) => (
                                                                    <div key={lIndex} className="flex gap-2">
                                                                        <input
                                                                            type="text"
                                                                            value={listItem}
                                                                            onChange={e => updateCurriculumList(index, lIndex, e.target.value)}
                                                                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none text-sm"
                                                                            placeholder={`Topic ${lIndex + 1}`}
                                                                        />
                                                                        {(item.list || []).length > 1 && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => removeCurriculumListItem(index, lIndex)}
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
                                </div>
                            )}

                            {/* CTA TAB */}
                            {activeTab === 'cta' && (
                                <div className="space-y-6">
                                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">Call to Action Section</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Title</label>
                                            <input
                                                type="text"
                                                value={ctaSection.program_cta_title}
                                                onChange={e => setCtaSection({ ...ctaSection, program_cta_title: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                placeholder="Ready to Start Your Career?"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Subtitle</label>
                                            <textarea
                                                rows={2}
                                                value={ctaSection.program_cta_subtitle}
                                                onChange={e => setCtaSection({ ...ctaSection, program_cta_subtitle: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                placeholder="Join thousands of successful alumni..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                                            <input
                                                type="text"
                                                value={ctaSection.program_cta_button_text}
                                                onChange={e => setCtaSection({ ...ctaSection, program_cta_button_text: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                placeholder="Register Now"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                                            <input
                                                type="text"
                                                value={ctaSection.program_cta_button_link}
                                                onChange={e => setCtaSection({ ...ctaSection, program_cta_button_link: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                                                placeholder="/auth/register"
                                            />
                                        </div>
                                    </div>
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
