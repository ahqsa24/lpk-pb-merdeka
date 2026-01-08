import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { checkAdmin, AuthenticatedRequest } from '@/lib/auth';

const prisma = new PrismaClient() as any;

const serializeBigInt = (obj: any) => {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value
    ));
}

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid session ID' });
    }

    if (req.method === 'GET') {
        try {
            // Get attendance records for this session with user details
            const records = await prisma.attendance_records.findMany({
                where: { session_id: BigInt(id) },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                },
                orderBy: { checked_in_at: 'asc' }
            });

            return res.json(serializeBigInt(records));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching attendance records' });
        }
    }

    res.status(405).end();
}

export default checkAdmin(handler);
