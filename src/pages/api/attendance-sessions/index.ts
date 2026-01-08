import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // Fetch only active sessions
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const sessions = await prisma.attendance_sessions.findMany({
                where: {
                    is_active: true,
                    // Optionally filter by date >= today? 
                    // For now just active flag as per laravel logic assumption
                },
                orderBy: { date: 'desc' },
            });

            const serialized = sessions.map(s => ({
                ...s,
                id: s.id.toString(),
                date: s.date.toISOString(),
                start_time: s.start_time.toISOString(), // Contains dummy date part
                end_time: s.end_time.toISOString(),
                created_at: s.created_at?.toISOString()
            }));

            return res.status(200).json(serialized);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching sessions' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
