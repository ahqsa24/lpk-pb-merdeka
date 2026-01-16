import { NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { checkAdmin, AuthenticatedRequest } from '@/lib/auth';

const prisma = new PrismaClient() as any;

const serializeBigInt = (obj: any) => {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value
    ));
}

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { type_id } = req.query;

            const questions = await prisma.question_bank.findMany({
                where: type_id ? { type_id: BigInt(String(type_id)) } : undefined,
                include: {
                    type: {
                        include: {
                            category: true
                        }
                    }
                },
                orderBy: { created_at: 'desc' }
            });
            return res.json(serializeBigInt(questions));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching questions' });
        }
    }

    if (req.method === 'POST') {
        try {
            const { content, options, correct_answer, explanation, type_id } = req.body;

            if (!content || !options || !correct_answer || !type_id) {
                return res.status(400).json({ message: 'Content, options, correct answer, and type ID are required' });
            }

            // Ensure options is stringified JSON if it comes as an object/array
            const optionsString = typeof options === 'string' ? options : JSON.stringify(options);

            const question = await prisma.question_bank.create({
                data: {
                    content,
                    options: optionsString,
                    correct_answer,
                    explanation,
                    type_id: BigInt(type_id)
                }
            });
            return res.json(serializeBigInt(question));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error creating question' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

export default checkAdmin(handler);
