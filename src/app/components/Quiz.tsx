'use client';

import { useState, useEffect } from 'react';
import { Question, GameState } from '@/types/quiz';
import { saveGameResults, getUserIdByTelegramId } from '../actions';
import { useRouter } from 'next/navigation';

type Props = {
  initialQuestions: Question[];
  telegramId: number;
};

export function Quiz({ initialQuestions, telegramId }: Props) {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    questions: initialQuestions,
    answers: [],
    startTime: new Date(),
    score: 0,
    correctAnswers: 0,
    endTime: undefined
  });
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];

  const handleAnswer = async (optionIndex: number) => {
    setSelectedOption(optionIndex);
    
    const isCorrect = optionIndex === currentQuestion.correctOption;
    const newScore = isCorrect ? gameState.score + currentQuestion.score : gameState.score;
    const newCorrectAnswers = isCorrect ? gameState.correctAnswers + 1 : gameState.correctAnswers;

    // Wait a moment before moving to next question
    setTimeout(async () => {
      if (gameState.currentQuestionIndex === gameState.questions.length - 1) {
        try {
          const userId = await getUserIdByTelegramId(telegramId);
          const finalGameState = {
            ...gameState,
            answers: [...gameState.answers, optionIndex],
            score: newScore,
            correctAnswers: newCorrectAnswers,
            endTime: new Date(),
          };

          const results = await saveGameResults(userId, finalGameState);
          setResults(results);
          setIsFinished(true);
        } catch (error) {
          console.error('Error saving results:', error);
          router.push('/');
        }
      } else {
        setGameState({
          ...gameState,
          currentQuestionIndex: gameState.currentQuestionIndex + 1,
          answers: [...gameState.answers, optionIndex],
          score: newScore,
          correctAnswers: newCorrectAnswers,
        });
        setSelectedOption(null);
      }
    }, 500); // Reduced delay to 500ms since we're not showing correct/incorrect
  };

  const getOptionClassName = (index: number) => {
    if (selectedOption === null) {
      return "w-full p-4 text-left border rounded-lg text-lg font-medium text-black hover:bg-blue-50 transition-colors";
    }

    if (selectedOption === index) {
      return "w-full p-4 text-left border rounded-lg text-lg font-medium bg-blue-100 border-blue-500 text-black";
    }

    return "w-full p-4 text-left border rounded-lg text-lg font-medium text-black opacity-75";
  };

  const handleMainMenu = () => {
    router.push('/menu');
  };

  const handlePlayAgain = async () => {
    const response = await fetch('/game', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (response.ok) {
      router.refresh();
      router.push('/game');
    }
  };

  if (isFinished) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Игра завершена!</h2>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-500 mb-2">{results.score}</div>
            <div className="text-black">Очков набрано</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-black">{results.correctAnswers}/{results.totalQuestions}</div>
              <div className="text-black">Правильных ответов</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-black">{results.timeSpent}с</div>
              <div className="text-black">Затраченное время</div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleMainMenu}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              На главную
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-medium text-black">
          Вопрос {gameState.currentQuestionIndex + 1} из {gameState.questions.length}
        </div>
        <div className="text-xl font-bold text-blue-600">
          {gameState.score} очков
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-black mb-6">{currentQuestion.text}</h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !selectedOption && handleAnswer(index)}
              disabled={selectedOption !== null}
              className={getOptionClassName(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm font-medium text-blue-900 text-center">
        {currentQuestion.difficulty === 1 && "Легкий вопрос • 100 очков"}
        {currentQuestion.difficulty === 2 && "Средний вопрос • 200 очков"}
        {currentQuestion.difficulty === 3 && "Сложный вопрос • 300 очков"}
      </div>
    </div>
  );
} 