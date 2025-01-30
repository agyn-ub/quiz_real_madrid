import { getRandomQuestions } from './actions';
import { Quiz } from './components/Quiz';
import type { Question } from '@/types/quiz';
import TelegramAuth from '@/components/TelegramAuth';

export default function Home() {
  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Викторина: Реал Мадрид</h1>
      <TelegramAuth />
    </main>
  );
}
