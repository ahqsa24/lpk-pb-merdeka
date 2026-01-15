import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { checkAdmin, AuthenticatedRequest } from '@/lib/auth';

// Keys for Program page content
const PROGRAM_KEYS = [
    // Why Choose Us Section
    'program_why_title',
    'program_why_subtitle',
    // Features (stored as JSON array)
    'program_features',
    // Kurikulum Section
    'program_curriculum_title',
    'program_curriculum_subtitle',
    // Curriculum Items (stored as JSON array)
    'program_curriculum_items',
    // CTA Section
    'program_cta_title',
    'program_cta_subtitle',
    'program_cta_button_text',
    'program_cta_button_link'
];

const JSON_ARRAY_KEYS = ['program_features', 'program_curriculum_items'];

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const settings = await (prisma as any).cms_settings.findMany({
                where: {
                    key: { in: PROGRAM_KEYS }
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

            return res.json(settingsObj);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching program settings' });
        }
    }

    if (req.method === 'POST') {
        try {
            const data = req.body;

            const updates = Object.keys(data).map(async (key) => {
                let value = data[key];

                if (JSON_ARRAY_KEYS.includes(key)) {
                    value = JSON.stringify(value);
                }

                return (prisma as any).cms_settings.upsert({
                    where: { key },
                    update: { value },
                    create: { key, value }
                });
            });

            await Promise.all(updates);
            return res.json({ success: true });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error saving program settings' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

export default checkAdmin(handler);
