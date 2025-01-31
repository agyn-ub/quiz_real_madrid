'use server';

import { db } from '@/db/config';
import { users, questions, scores } from '@/db/schema';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { eq, desc } from 'drizzle-orm';
import { GameState } from '@/types/quiz';
import { withRetry } from '@/db/utils';

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
  noStore();
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
  noStore();
  
  try {
    return await withRetry(() =>
      db
        .select()
        .from(scores)
        .where(eq(scores.userId, userId))
        .orderBy(desc(scores.createdAt))
        .limit(10)
    );
  } catch (error) {
    console.error('Error getting user results:', error);
    return [];
  }
}

export async function getUserIdByTelegramId(telegramId: number) {
  noStore();
  
  try {
    const user = await withRetry(() => 
      db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.telegramId, telegramId))
        .limit(1)
    );

    if (!user.length) {
      throw new Error('User not found');
    }

    return user[0].id;
  } catch (error) {
    console.error('Error getting user ID:', error);
    throw new Error('Failed to get user ID. Please try again.');
  }
} 