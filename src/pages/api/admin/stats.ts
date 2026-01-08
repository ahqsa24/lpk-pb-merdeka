import type { NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { checkAdmin, AuthenticatedRequest } from '@/lib/auth';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const totalUsers = await prisma.users.count();
        const totalAdmins = await prisma.users.count({
            where: { role: 'admin' }
        });
        const activeSessions = await prisma.attendance_sessions.count({
            where: { is_active: true }
        });

        return res.status(200).json({
            totalUsers,
            totalAdmins,
            activeSessions
        });
    } catch (error) {
        console.error('Stats error:', error);
        return res.status(500).json({ message: 'Error fetching statistics' });
    }
}

export default checkAdmin(handler as any);
