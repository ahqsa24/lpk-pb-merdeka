import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;

    if (!slug || typeof slug !== 'string') {
        return res.status(400).json({ message: 'Invalid slug' });
    }

    if (req.method === 'GET') {
        try {
            const article = await prisma.cms_articles.findUnique({
                where: {
                    slug: slug,
                }
            });

            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }

            // Only return if published, unless admin (but this is public api for now)
            if (!article.is_published) {
                return res.status(404).json({ message: 'Article not found' });
            }

            const serialized = {
                ...article,
                id: article.id.toString(),
                published_at: article.published_at?.toISOString(),
                created_at: article.created_at?.toISOString(),
                updated_at: article.updated_at?.toISOString(),
            };

            return res.status(200).json(serialized);
        } catch (error) {
            console.error('Failed to fetch article:', error);
            return res.status(500).json({ message: 'Error fetching article' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
