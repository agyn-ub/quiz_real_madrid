'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

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

type Props = {
  leaders: Leader[];
};

export function LeadersList({ leaders }: Props) {
  const router = useRouter();

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

      {leaders.map((leader, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="flex-shrink-0 w-12 h-12 mr-4">
            {leader.photoUrl ? (
              <Image
                src={leader.photoUrl}
                alt={leader.firstName}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-blue-500">
                  {leader.firstName[0]}
                </span>
              </div>
            )}
          </div>
          <div className="flex-grow">
            <div className="font-medium text-black">
              {leader.firstName} {leader.lastName}
              {leader.username && (
                <span className="text-black text-sm ml-2">
                  @{leader.username}
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {leader.correctAnswers}/{leader.totalQuestions} правильных • {leader.timeSpent}с
            </div>
          </div>
          <div className="flex-shrink-0 text-xl font-bold text-blue-500">
            {leader.score}
          </div>
        </div>
      ))}
    </div>
  );
} 