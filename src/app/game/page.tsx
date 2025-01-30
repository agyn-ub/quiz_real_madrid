'use client';

import { getRandomQuestions } from '../actions';
import { Quiz } from '../components/Quiz';
import type { Question } from '@/types/quiz';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GamePage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [telegramId, setTelegramId] = useState<number | null>(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('telegramUser');
    if (!savedUser) {
      router.push('/');
      return;
    }
    const user = JSON.parse(savedUser);
    setTelegramId(user.id);

    // Fetch questions
    getRandomQuestions(10).then(fetchedQuestions => {
      const typedQuestions: Question[] = fetchedQuestions.map(q => ({
        ...q,
        difficulty: Math.min(Math.max(1, q.difficulty), 3) as 1 | 2 | 3
      }));
      setQuestions(typedQuestions);
    });
  }, [router]);

  if (!telegramId || questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Викторина: Реал Мадрид</h1>
      <Quiz 
        initialQuestions={questions}
        telegramId={telegramId}
      />
    </main>
  );
} 