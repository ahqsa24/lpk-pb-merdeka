import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

const JSON_ARRAY_KEYS = ['about_goals', 'about_struktur', 'about_programs'];

// Public API to get home/about content
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const settings = await (prisma as any).cms_settings.findMany({
            where: {
                key: {
                    in: [
                        'hero_title', 'hero_subtitle', 'hero_image_url', 'hero_cta_text', 'hero_cta_link',
                        'about_intro_title', 'about_intro_heading', 'about_intro_description', 'about_intro_image_url',
                        'about_vision_title', 'about_vision_heading', 'about_vision_description',
                        'about_mission_title', 'about_mission_heading', 'about_mission_description',
                        'about_goals', 'about_struktur', 'about_programs'
                    ]
                }
            }
        });

        const settingsObj: any = {};
        settings.forEach((s: any) => {
            if (JSON_ARRAY_KEYS.includes(s.key)) {
                try {
                    settingsObj[s.key] = JSON.parse(s.value);
                } catch {
                    settingsObj[s.key] = [];
                }
            } else {
                settingsObj[s.key] = s.value;
            }
        });

        return res.status(200).json(settingsObj);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching content' });
    }
}
