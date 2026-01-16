import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { FaPlus, FaTrash, FaEdit, FaClipboardList, FaCalendarAlt } from 'react-icons/fa';
import { Toast } from '@/components/shared/molecules/Toast';
import { ConfirmationModal } from '@/components/shared/molecules/ConfirmationModal';
import { useSearch } from '@/context/SearchContext';

interface WeeklyQuiz {
    id: string;
    title: string;
    category: {
        id: string;
        name: string;
    };
    start_date: string;
    end_date: string;
    is_active: boolean;
    config: string;
    _count?: {
        quiz_attempts: number;
    }
}

interface Category {
    id: string;
    name: string;
}

export default function WeeklyQuizManager() {
    const { searchQuery } = useSearch();
    const [quizzes, setQuizzes] = useState<WeeklyQuiz[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

    // Form State
    const [formId, setFormId] = useState('');
    const [formTitle, setFormTitle] = useState('');
    const [formCategory, setFormCategory] = useState('');
    const [formStartDate, setFormStartDate] = useState('');
    const [formEndDate, setFormEndDate] = useState('');
    const [formQuestionCount, setFormQuestionCount] = useState<number>(10);
    const [formIsActive, setFormIsActive] = useState(true);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
    const [toast, setToast] = useState({ isOpen: false, message: '', type: 'info' as 'success' | 'error' | 'info' });

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Quizzes
            const quizRes = await fetch(`/api/admin/content/weekly-quiz`, { headers: getAuthHeaders() });
            if (quizRes.ok) setQuizzes(await quizRes.json());

            // Fetch Categories (for Dropdown)
            const catRes = await fetch(`/api/admin/content/quiz-bank/categories`, { headers: getAuthHeaders() });
            if (catRes.ok) setCategories(await catRes.json());

        } catch (error) {
            console.error(error);
            setToast({ isOpen: true, message: 'Failed to fetch data', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toInputDate = (isoString: string) => {
        if (!isoString) return '';
        // Create date object
        const date = new Date(isoString);
        // Correct for timezone offset to show correct local time in input
        const offset = date.getTimezoneOffset() * 60000;
        const localDate = new Date(date.getTime() - offset);
        return localDate.toISOString().slice(0, 16);
    };

    const handleCreate = () => {
        setFormId('');
        setFormTitle('');
        setFormCategory(categories.length > 0 ? categories[0].id : '');
        // Default: Start tomorrow, end 1 week later
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(9, 0, 0, 0); // 09:00

        const nextWeek = new Date(tomorrow);
        nextWeek.setDate(nextWeek.getDate() + 7);

        setFormStartDate(toInputDate(tomorrow.toISOString()));
        setFormEndDate(toInputDate(nextWeek.toISOString()));
        setFormQuestionCount(10);
        setFormIsActive(true);

        setFormMode('create');
        setIsFormOpen(true);
    };

    const handleEdit = (q: WeeklyQuiz) => {
        setFormId(q.id);
        setFormTitle(q.title);
        setFormCategory(q.category.id);
        setFormStartDate(toInputDate(q.start_date));
        setFormEndDate(toInputDate(q.end_date));
        setFormIsActive(q.is_active);

        try {
            const config = JSON.parse(q.config || '{}');
            setFormQuestionCount(config.question_count || 10);
        } catch (e) {
            setFormQuestionCount(10);
        }

        setFormMode('edit');
        setIsFormOpen(true);
    };

    const handleDeleteClick = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        setDeleteTargetId(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteTargetId) return;
        try {
            const res = await fetch(`/api/admin/content/weekly-quiz/${deleteTargetId}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            if (res.ok) {
                setQuizzes(quizzes.filter(q => q.id !== deleteTargetId));
                setToast({ isOpen: true, message: 'Quiz deleted', type: 'success' });
            } else {
                setToast({ isOpen: true, message: 'Failed to delete quiz', type: 'error' });
            }
        } catch (error) {
            setToast({ isOpen: true, message: 'Error deleting quiz', type: 'error' });
        } finally {
            setIsDeleteModalOpen(false);
            setDeleteTargetId(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formCategory) {
            setToast({ isOpen: true, message: 'Please select a category', type: 'error' });
            return;
        }

        const url = formMode === 'create'
            ? '/api/admin/content/weekly-quiz'
            : `/api/admin/content/weekly-quiz/${formId}`;

        const method = formMode === 'create' ? 'POST' : 'PUT';

        const payload = {
            title: formTitle,
            category_id: formCategory,
            start_date: new Date(formStartDate).toISOString(),
            end_date: new Date(formEndDate).toISOString(),
            question_count: formQuestionCount,
            is_active: formIsActive
        };

        try {
            const res = await fetch(url, {
                method,
                headers: getAuthHeaders(),
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setIsFormOpen(false);
                fetchData();
                setToast({ isOpen: true, message: `Quiz ${formMode === 'create' ? 'created' : 'updated'}`, type: 'success' });
            } else {
                setToast({ isOpen: true, message: 'Operation failed', type: 'error' });
            }
        } catch (error) {
            setToast({ isOpen: true, message: 'Error submitting form', type: 'error' });
        }
    };

    const filteredQuizzes = quizzes.filter(q =>
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleString('id-ID', {
            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <AdminLayout title="Weekly Quizzes">
            <Head>
                <title>Weekly Quiz Manager | Admin</title>
            </Head>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Weekly Quiz Schedule</h2>
                        <p className="text-gray-500 text-sm mt-1">Manage weekly quizzes and their schedules.</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition shadow-sm"
                    >
                        <FaPlus /> Schedule Quiz
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-gray-500">Loading Quizzes...</div>
                ) : (
                    <div className="space-y-4">
                        {filteredQuizzes.length === 0 ? (
                            <div className="py-12 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
                                {searchQuery ? 'No quizzes match your search.' : 'No quizzes scheduled. Create one to get started.'}
                            </div>
                        ) : (
                            filteredQuizzes.map(quiz => (
                                <div key={quiz.id} className="group relative bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-lg flex items-center justify-center text-xl shrink-0 ${quiz.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                            <FaClipboardList />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-gray-900">{quiz.title}</h4>
                                                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{quiz.category.name}</span>
                                                {!quiz.is_active && <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full">Inactive</span>}
                                            </div>
                                            <div className="text-sm text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
                                                <span className="flex items-center gap-1">
                                                    <FaCalendarAlt className="text-gray-400" />
                                                    {formatDate(quiz.start_date)} - {formatDate(quiz.end_date)}
                                                </span>
                                                <span>• {quiz._count?.quiz_attempts || 0} Attempts</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 self-end md:self-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEdit(quiz)}
                                            className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                        >
                                            <FaEdit className="inline mr-1" /> Edit
                                        </button>
                                        <button
                                            onClick={(e) => handleDeleteClick(quiz.id, e)}
                                            className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <FaTrash className="inline mr-1" /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 animate-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 capitalize">
                            {formMode === 'create' ? 'Schedule Weekly Quiz' : 'Edit Quiz'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formTitle}
                                    onChange={e => setFormTitle(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                    placeholder="e.g. Weekly Math Challenge #1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    required
                                    value={formCategory}
                                    onChange={e => setFormCategory(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none bg-white"
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                    <input
                                        type="datetime-local"
                                        required
                                        value={formStartDate}
                                        onChange={e => setFormStartDate(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                    <input
                                        type="datetime-local"
                                        required
                                        value={formEndDate}
                                        onChange={e => setFormEndDate(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Questions</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="50"
                                    required
                                    value={formQuestionCount}
                                    onChange={e => setFormQuestionCount(parseInt(e.target.value))}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                    placeholder="e.g. 10"
                                />
                                <p className="text-xs text-gray-500 mt-1">Random questions will be selected from the category.</p>
                            </div>

                            {formMode === 'edit' && (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={formIsActive}
                                        onChange={e => setFormIsActive(e.target.checked)}
                                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded cursor-pointer"
                                    />
                                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">
                                        Is Active?
                                    </label>
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    Save Quiz
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Quiz?"
                message="Are you sure? All attempts associated with this quiz will also be deleted."
                isDanger={true}
                confirmText="Delete"
            />

            <Toast
                isOpen={toast.isOpen}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, isOpen: false })}
            />
        </AdminLayout>
    );
}
