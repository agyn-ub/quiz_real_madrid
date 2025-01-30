'use client';

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

type Props = {
  leaders: Leader[];
};

export function LeadersList({ leaders }: Props) {
  const router = useRouter();

  const handleMainMenu = () => {
    router.push('/menu');
  };

  const getPositionStyle = (position: number) => {
    switch (position) {
      case 1:
        return "bg-yellow-500 text-white";
      case 2:
        return "bg-gray-400 text-white";
      case 3:
        return "bg-amber-600 text-white";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
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
        <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${getPositionStyle(index + 1)}`}>
            {index + 1}
          </div>
          
          <div className="flex-shrink-0">
            {leader.photoUrl ? (
              <img src={leader.photoUrl} alt="" className="w-12 h-12 rounded-full" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-xl">
                  {leader.firstName.charAt(0)}
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
            <div className="text-sm text-black">
              {leader.score} очков • {leader.correctAnswers}/{leader.totalQuestions} правильных • {leader.timeSpent}с
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 