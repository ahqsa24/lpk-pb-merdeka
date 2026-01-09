import type { NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { checkAuth, AuthenticatedRequest } from '@/lib/auth';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const userId = BigInt(req.user!.userId);

            const user = await prisma.users.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                }
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({
                ...user,
                id: user.id.toString()
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    if (req.method === 'PUT') {
        try {
            const userId = BigInt(req.user!.userId);
            const { name, email, password } = req.body;

            const updateData: any = { name, email };

            // Check if email is already taken by another user
            if (email) {
                const existingUser = await prisma.users.findFirst({
                    where: {
                        email: email,
                        NOT: {
                            id: userId
                        }
                    }
                });
                if (existingUser) {
                    return res.status(400).json({ message: 'Email already in use' });
                }
            }

            if (password) {
                const bcrypt = require('bcryptjs');
                updateData.password = await bcrypt.hash(password, 10);
            }

            const updatedUser = await prisma.users.update({
                where: { id: userId },
                data: updateData,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            });

            return res.status(200).json({
                message: 'Profile updated successfully',
                user: {
                    ...updatedUser,
                    id: updatedUser.id.toString()
                }
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating profile' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

export default checkAuth(handler as any);
