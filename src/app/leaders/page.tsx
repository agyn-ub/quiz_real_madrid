import { getTopScores } from '../actions';
import { LeadersList } from '@/app/components/LeadersList';

export default async function LeadersPage() {
  const leaders = await getTopScores(20);
  
  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Таблица лидеров</h1>
      <LeadersList leaders={leaders} />
    </main>
  );
} 