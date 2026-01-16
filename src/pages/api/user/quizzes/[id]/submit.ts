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
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id } = req.query; // Quiz ID
    const { answers } = req.body; // { question_id: answer_value }
    const userId = req.user?.id;

    if (!answers || Object.keys(answers).length === 0) {
        return res.status(400).json({ message: 'No answers provided' });
    }

    try {
        // 1. Validate Quiz & Attempt
        const quiz = await prisma.weekly_quizzes.findUnique({
            where: { id: BigInt(String(id)) },
            include: { quiz_attempts: { where: { user_id: userId } } }
        });

        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        if (quiz.quiz_attempts.length > 0) {
            return res.status(400).json({ message: 'You have already submitted this quiz' });
        }

        // 2. Fetch Questions to Check Answers
        const questionIds = Object.keys(answers).map(qid => BigInt(qid));
        const questions = await prisma.question_bank.findMany({
            where: {
                id: { in: questionIds }
            }
        });

        // 3. Calculate Score
        let correctCount = 0;
        let totalQuestions = questions.length;

        questions.forEach((q: any) => {
            const submittedAnswer = answers[String(q.id)];
            if (submittedAnswer === q.correct_answer) {
                correctCount++;
            }
        });

        const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

        // 4. Calculate XP Points
        // 10 points per correct answer + 50 bonus for 100 score
        let earnedPoints = (correctCount * 10);
        if (score === 100) earnedPoints += 50;

        // 5. Transaction: Create Attempt & Update Gamification
        await prisma.$transaction(async (tx: any) => {
            // Create Attempt
            await tx.quiz_attempts.create({
                data: {
                    user_id: userId,
                    quiz_id: BigInt(String(id)),
                    score: score,
                    answers: JSON.stringify(answers), // Store raw answers
                    started_at: new Date(), // Approximate
                    finished_at: new Date()
                }
            });

            // Update/Create Gamification Profile
            // upsert
            const profile = await tx.gamification_profile.findUnique({
                where: { user_id: userId }
            });

            if (profile) {
                await tx.gamification_profile.update({
                    where: { user_id: userId },
                    data: {
                        total_points: profile.total_points + earnedPoints,
                        // Level up logic could go here
                    }
                });
            } else {
                await tx.gamification_profile.create({
                    data: {
                        user_id: userId,
                        total_points: earnedPoints,
                        level: 1
                    }
                });
            }
        });

        return res.json({
            message: 'Quiz submitted successfully',
            score,
            correctCount,
            totalQuestions,
            earnedPoints
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error submitting quiz' });
    }
}

export default checkAuth(handler);
