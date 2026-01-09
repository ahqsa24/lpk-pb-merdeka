import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const articles = await prisma.cms_articles.findMany({
                where: {
                    is_published: true,
                    published_at: {
                        lte: new Date()
                    }
                },
                orderBy: {
                    published_at: 'desc'
                },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    excerpt: true,
                    thumbnail_url: true,
                    author: true,
                    published_at: true,
                    // We don't need full content for the list
                }
            });

            const serialized = articles.map(article => ({
                ...article,
                id: article.id.toString(),
                published_at: article.published_at?.toISOString()
            }));

            return res.status(200).json(serialized);
        } catch (error) {
            console.error('Failed to fetch articles:', error);
            return res.status(500).json({ message: 'Error fetching articles' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
