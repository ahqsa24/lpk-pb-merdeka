import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function DebugPage() {
    const [tokenInfo, setTokenInfo] = useState<any>(null);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [dbUsers, setDbUsers] = useState<any[]>([]);

    useEffect(() => {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setTokenInfo(payload);
            } catch (e) {
                setTokenInfo({ error: 'Invalid token format' });
            }
        }

        if (user) {
            try {
                setUserInfo(JSON.parse(user));
            } catch (e) {
                setUserInfo({ error: 'Invalid user data' });
            }
        }

        // Fetch users from DB
        fetch('/api/debug/users')
            .then(res => res.json())
            .then(data => setDbUsers(data))
            .catch(err => console.error(err));
    }, []);

    const handleClearStorage = () => {
        localStorage.clear();
        sessionStorage.clear();
        alert('Storage cleared! Reloading...');
        window.location.reload();
    };

    const handleForceLogout = () => {
        localStorage.clear();
        window.location.href = '/auth/login';
    };

    return (
        <>
            <Head>
                <title>Debug - SuperAdmin</title>
            </Head>
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">🔍 SuperAdmin Debug Panel</h1>
                        <div className="flex gap-4">
                            <button
                                onClick={handleClearStorage}
                                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
                            >
                                Clear Storage & Reload
                            </button>
                            <button
                                onClick={handleForceLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                            >
                                Force Logout
                            </button>
                        </div>
                    </div>

                    {/* Token Info */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">JWT Token Payload</h2>
                        {tokenInfo ? (
                            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                                {JSON.stringify(tokenInfo, null, 2)}
                            </pre>
                        ) : (
                            <p className="text-gray-500">No token found in localStorage</p>
                        )}
                        {tokenInfo?.role && (
                            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500">
                                <p className="font-semibold">Current Role: <span className="text-blue-700">{tokenInfo.role}</span></p>
                                {tokenInfo.role === 'superAdmin' ? (
                                    <p className="text-green-600 mt-2">✅ Role is superAdmin - should redirect to /admin/dashboard</p>
                                ) : (
                                    <p className="text-red-600 mt-2">❌ Role is NOT superAdmin - will redirect to /dashboard</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* User Info */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">User Data (localStorage)</h2>
                        {userInfo ? (
                            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                                {JSON.stringify(userInfo, null, 2)}
                            </pre>
                        ) : (
                            <p className="text-gray-500">No user data found in localStorage</p>
                        )}
                    </div>

                    {/* Database Users */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Users in Database (First 10)</h2>
                        {dbUsers.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-3 border">ID</th>
                                            <th className="p-3 border">Name</th>
                                            <th className="p-3 border">Email</th>
                                            <th className="p-3 border">Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dbUsers.map((user) => (
                                            <tr key={user.id} className={user.role === 'superAdmin' ? 'bg-purple-50' : ''}>
                                                <td className="p-3 border">{user.id}</td>
                                                <td className="p-3 border">{user.name}</td>
                                                <td className="p-3 border">{user.email}</td>
                                                <td className="p-3 border">
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${user.role === 'superAdmin'
                                                            ? 'bg-purple-100 text-purple-700'
                                                            : user.role === 'admin'
                                                                ? 'bg-blue-100 text-blue-700'
                                                                : 'bg-gray-100 text-gray-700'
                                                        }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500">Loading users...</p>
                        )}
                    </div>

                    {/* Instructions */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
                        <h3 className="font-bold text-yellow-900 mb-2">📋 Troubleshooting Steps:</h3>
                        <ol className="list-decimal list-inside space-y-2 text-yellow-800">
                            <li>Check if user ID 1 has role <code className="bg-yellow-100 px-1 rounded">superAdmin</code> in the table above</li>
                            <li>If not, run: <code className="bg-yellow-100 px-1 rounded">UPDATE users SET role = 'superAdmin' WHERE id = 1;</code></li>
                            <li>Click "Force Logout" button above</li>
                            <li>Login again with user ID 1 credentials</li>
                            <li>Should redirect to /admin/dashboard</li>
                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
}
