import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'lpk-merdeka-secret-key-123';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }

    try {
        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        // Verify password
        // Laravel uses standard bcrypt ($2y$), which bcryptjs supports.
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        // Create Token
        const token = jwt.sign(
            { userId: user.id.toString(), email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return user info (exclude password)
        const userInfo = {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            // Add other fields if needed
        };

        return res.status(200).json({
            token,
            user: userInfo,
            message: 'Login berhasil'
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan sistem' });
    }
}
