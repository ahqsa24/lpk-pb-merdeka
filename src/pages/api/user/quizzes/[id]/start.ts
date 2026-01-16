import { NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { checkAuth, AuthenticatedRequest } from '@/lib/auth';

const prisma = new PrismaClient() as any;

const serializeBigInt = (obj: any) => {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value
    ));
}

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id } = req.query;
    const userId = req.user?.id;

    try {
        // 1. Fetch Quiz Details
        const quiz = await prisma.weekly_quizzes.findUnique({
            where: { id: BigInt(String(id)) },
            include: { quiz_attempts: { where: { user_id: userId } } }
        });

        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        if (!quiz.is_active) return res.status(400).json({ message: 'Quiz is not active' });

        const now = new Date();
        if (now < new Date(quiz.start_date) || now > new Date(quiz.end_date)) {
            return res.status(400).json({ message: 'Quiz is not currently open' });
        }

        if (quiz.quiz_attempts.length > 0) {
            return res.status(400).json({ message: 'You have already attempted this quiz' });
        }

        // 2. Parse Config
        let questionCount = 10;
        try {
            const config = JSON.parse(quiz.config || '{}');
            if (config.question_count) questionCount = config.question_count;
        } catch (e) { }

        // 3. Fetch Questions from Category
        // We link question -> type -> category
        const questions = await prisma.question_bank.findMany({
            where: {
                type: {
                    category_id: quiz.category_id
                }
            },
            select: {
                id: true,
                content: true,
                options: true,
                type_id: true,
                // Exclude correct_answer and explanation
            }
        });

        if (questions.length === 0) {
            return res.status(500).json({ message: 'No questions available for this quiz' });
        }

        // 4. Randomize and Slice
        const shuffled = questions.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, questionCount);

        return res.json(serializeBigInt(selected));

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error starting quiz' });
    }
}

export default checkAuth(handler);
