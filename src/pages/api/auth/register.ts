import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, password, password_confirmation } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Semua kolom wajib diisi' });
    }

    if (password !== password_confirmation) {
        return res.status(400).json({ message: 'Konfirmasi password tidak cocok' });
    }

    try {
        const existingUser = await prisma.users.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'user', // Default role
                created_at: new Date(),
                updated_at: new Date()
            },
        });

        return res.status(201).json({
            message: 'Registrasi berhasil',
            user: {
                id: user.id.toString(),
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan sistem' });
    }
}
