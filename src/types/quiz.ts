export type Question = {
  id: number;
  text: string;
  options: string[];
  correctOption: number;
  difficulty: 1 | 2 | 3;
  score: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Score = {
  id: number;
  userId: number;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  createdAt: Date;
};

export type GameState = {
  currentQuestionIndex: number;
  questions: Question[];
  answers: number[];
  startTime: Date;
  endTime?: Date;
  score: number;
  correctAnswers: number;
}; 