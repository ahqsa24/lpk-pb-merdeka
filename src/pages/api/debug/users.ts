import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient() as any;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const users = await prisma.users.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                created_at: true
            },
            orderBy: { id: 'asc' },
            take: 10
        });

        const serialized = users.map((u: any) => ({
            ...u,
            id: u.id.toString()
        }));

        return res.json(serialized);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching users' });
    }
}
