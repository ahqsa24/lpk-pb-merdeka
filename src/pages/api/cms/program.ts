import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

const JSON_ARRAY_KEYS = ['program_features', 'program_curriculum_items'];

// Public API to get program content
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const settings = await (prisma as any).cms_settings.findMany({
            where: {
                key: {
                    in: [
                        'program_why_title', 'program_why_subtitle',
                        'program_features',
                        'program_curriculum_title', 'program_curriculum_subtitle',
                        'program_curriculum_items',
                        'program_cta_title', 'program_cta_subtitle',
                        'program_cta_button_text', 'program_cta_button_link'
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
        return res.status(500).json({ message: 'Error fetching program content' });
    }
}
