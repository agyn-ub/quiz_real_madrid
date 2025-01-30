'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { TelegramUser } from '@/types/telegram';
import Image from 'next/image';

export default function GameMenu() {
  const router = useRouter();
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('telegramUser');
    if (!savedUser) {
      router.push('/');
      return;
    }
    setUser(JSON.parse(savedUser));
  }, [router]);

  const handleOptionClick = (option: 'game' | 'results' | 'leaders') => {
    if (option === 'game') {
      router.push('/game');
    } else if (option === 'results') {
      router.push('/results');
    } else if (option === 'leaders') {
      router.push('/leaders');
    }
  };

  if (!user) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-4">
        {user.photo_url && (
          <Image
            src={user.photo_url}
            alt={user.first_name}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full"
          />
        )}
        <div className="text-center">
          <h2 className="text-xl font-bold">
            {user.first_name} {user.last_name}
          </h2>
          {user.username && (
            <p className="text-gray-600 dark:text-gray-400">
              @{user.username}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        <button
          onClick={() => handleOptionClick('game')}
          className="flex flex-col items-center p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">Играть</span>
        </button>

        <button
          onClick={() => handleOptionClick('leaders')}
          className="flex flex-col items-center p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-medium">Лидеры</span>
        </button>

        <button
          onClick={() => handleOptionClick('results')}
          className="flex flex-col items-center p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-sm font-medium">Результаты</span>
        </button>

      </div>
    </div>
  );
} 