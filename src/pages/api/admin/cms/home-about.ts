import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { checkAdmin, AuthenticatedRequest } from '@/lib/auth';

// Keys for Home & About page content
const HOME_ABOUT_KEYS = [
    // Hero Section
    'hero_title',
    'hero_subtitle',
    'hero_image_url',
    'hero_cta_text',
    'hero_cta_link',
    // About Intro
    'about_intro_title',
    'about_intro_heading',
    'about_intro_description',
    'about_intro_image_url',
    // Vision
    'about_vision_title',
    'about_vision_heading',
    'about_vision_description',
    // Mission
    'about_mission_title',
    'about_mission_heading',
    'about_mission_description',
    // Goals (stored as JSON array)
    'about_goals',
    // Struktur Program (stored as JSON array)
    'about_struktur',
    // Programs (stored as JSON array)
    'about_programs'
];

// Keys that should be stored/parsed as JSON
const JSON_ARRAY_KEYS = ['about_goals', 'about_struktur', 'about_programs'];

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const settings = await (prisma as any).cms_settings.findMany({
                where: {
                    key: { in: HOME_ABOUT_KEYS }
                }
            });

            const settingsObj: any = {};
            settings.forEach((s: any) => {
                // Parse JSON for array fields
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
            return res.status(500).json({ message: 'Error fetching home/about settings' });
        }
    }

    if (req.method === 'POST') {
        try {
            const data = req.body;

            const updates = Object.keys(data).map(async (key) => {
                let value = data[key];

                // Stringify arrays for storage
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
            return res.status(500).json({ message: 'Error saving home/about settings' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

export default checkAdmin(handler);
