'use client';

import { Score } from '@/types/quiz';
import { useRouter } from 'next/navigation';

type Props = {
  results: Score[];
};

export function ResultsList({ results }: Props) {
  const router = useRouter();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleMainMenu = () => {
    router.push('/menu');
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleMainMenu}
        className="w-full mb-4 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
      >
        На главную
      </button>

      {results.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <p className="text-xl text-black mb-4">У вас пока нет результатов</p>
          <button
            onClick={() => router.push('/game')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Начать игру
          </button>
        </div>
      ) : (
        results.map((result) => (
          <div key={result.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{result.score}</div>
                <div className="text-black">Очков</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-black">
                  {result.correctAnswers}/{result.totalQuestions}
                </div>
                <div className="text-black">Правильных ответов</div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-black">{result.timeSpent}с</div>
                <div className="text-black">Время</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-black">
                  {formatDate(result.createdAt)}
                </div>
                <div className="text-black">Дата</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
} 