'use client';

import { getTopScores } from '../actions';
import { LeadersList } from '@/app/components/LeadersList';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Leader = {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  createdAt: Date | null;
  firstName: string;
  lastName: string | null;
  username: string | null;
  photoUrl: string | null;
};

export default function LeadersPage() {
  const router = useRouter();
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('telegramUser');
    if (!savedUser) {
      router.push('/');
      return;
    }

    getTopScores(20)
      .then(fetchedLeaders => {
        setLeaders(fetchedLeaders);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaders:', error);
        router.push('/');
      });
  }, [router]);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Таблица лидеров</h1>
      <LeadersList leaders={leaders} />
    </main>
  );
} 