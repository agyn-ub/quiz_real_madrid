'use client';

import { getUserResults, getUserIdByTelegramId } from '../actions';
import { ResultsList } from '@/app/components/ResultsList';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Score } from '@/types/quiz';

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('telegramUser');
    if (!savedUser) {
      router.push('/');
      return;
    }

    const user = JSON.parse(savedUser);
    getUserIdByTelegramId(user.id)
      .then(userId => getUserResults(userId))
      .then(userResults => {
        setResults(userResults);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching results:', error);
        router.push('/');
      });
  }, [router]);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Мои результаты</h1>
      <ResultsList results={results} />
    </main>
  );
} 