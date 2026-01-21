import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Fetch public statistics in parallel
        const [
            totalUsers,
            totalQuizzes,
            totalCertificates,
            totalEbooks,
            totalVideos,
            publishedArticles
        ] = await Promise.all([
            prisma.user.count({ where: { role: { not: { in: ['admin', 'superAdmin'] } } } }), // Only count regular users
            prisma.weekly_quizzes.count({ where: { is_active: true } }),
            prisma.certificates.count(),
            prisma.ebooks.count(),
            prisma.videos.count(),
            prisma.cms_articles.count({ where: { is_published: true } })
        ]);

        // Return only non-zero stats
        const stats: Record<string, number> = {};

        if (totalUsers > 0) stats.users = totalUsers;
        if (totalQuizzes > 0) stats.quizzes = totalQuizzes;
        if (totalCertificates > 0) stats.certificates = totalCertificates;
        if (totalEbooks > 0) stats.ebooks = totalEbooks;
        if (totalVideos > 0) stats.videos = totalVideos;
        if (publishedArticles > 0) stats.articles = publishedArticles;

        return res.status(200).json(stats);
    } catch (error) {
        console.error('Public stats error:', error);
        return res.status(500).json({ message: 'Error fetching statistics' });
    }
}
