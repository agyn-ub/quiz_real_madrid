'use server';

import { db } from '@/db/config';
import { users, questions, scores } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { eq, desc } from 'drizzle-orm';
import { GameState } from '@/types/quiz';

export async function saveUser(userData: {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}) {
  try {
    // Check if user exists
    const existingUser = await db.select()
      .from(users)
      .where(eq(users.telegramId, userData.id))
      .execute();

    if (existingUser.length > 0) {
      console.log('Updating existing user:', userData.id);
      // Update existing user
      await db.update(users)
        .set({
          firstName: userData.first_name,
          lastName: userData.last_name ?? null,
          username: userData.username ?? null,
          languageCode: userData.language_code ?? null,
          photoUrl: userData.photo_url ?? null,
        })
        .where(eq(users.telegramId, userData.id));
    } else {
      console.log('Creating new user:', userData.id);
      // Insert new user
      await db.insert(users).values({
        telegramId: userData.id,
        firstName: userData.first_name,
        lastName: userData.last_name ?? null,
        username: userData.username ?? null,
        languageCode: userData.language_code ?? null,
        photoUrl: userData.photo_url ?? null,
      });
    }
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to save user:', error);
  }
}

export async function getRandomQuestions(count: number = 10) {
  const allQuestions = await db.select().from(questions);
  const shuffled = allQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export async function saveGameResults(userId: number, gameState: GameState) {
  const timeSpent = Math.floor(
    (gameState.endTime!.getTime() - gameState.startTime.getTime()) / 1000
  );

  await db.insert(scores).values({
    userId,
    score: gameState.score,
    totalQuestions: gameState.questions.length,
    correctAnswers: gameState.correctAnswers,
    timeSpent,
  });

  return {
    score: gameState.score,
    correctAnswers: gameState.correctAnswers,
    totalQuestions: gameState.questions.length,
    timeSpent,
  };
}

export async function getUserResults(userId: number) {
  const userScores = await db
    .select()
    .from(scores)
    .where(eq(scores.userId, userId))
    .orderBy(desc(scores.createdAt))
    .limit(10);

  return userScores;
}

export async function getTopScores(limit: number = 20) {
  const results = await db
    .select({
      score: scores.score,
      correctAnswers: scores.correctAnswers,
      totalQuestions: scores.totalQuestions,
      timeSpent: scores.timeSpent,
      createdAt: scores.createdAt,
      firstName: users.firstName,
      lastName: users.lastName,
      username: users.username,
      photoUrl: users.photoUrl,
    })
    .from(scores)
    .innerJoin(users, eq(scores.userId, users.id))
    .orderBy(desc(scores.score))
    .limit(limit);

  // Transform the results to ensure firstName is never null
  return results.map(leader => ({
    ...leader,
    firstName: leader.firstName || 'Anonymous', // Provide a default value
    lastName: leader.lastName,
    username: leader.username,
    photoUrl: leader.photoUrl,
  }));
}

export async function getUserIdByTelegramId(telegramId: number) {
  const user = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.telegramId, telegramId))
    .limit(1);

  if (!user.length) {
    throw new Error('User not found');
  }

  return user[0].id;
} 