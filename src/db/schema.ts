import { pgTable, text, integer, timestamp, serial, json } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  telegramId: integer('telegram_id').unique().notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name'),
  username: text('username'),
  languageCode: text('language_code'),
  photoUrl: text('photo_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  text: text('text').notNull(),
  options: json('options').$type<string[]>().notNull(), // Array of possible answers
  correctOption: integer('correct_option').notNull(), // Index of correct answer in options array
  difficulty: integer('difficulty').notNull(), // 1: Easy, 2: Medium, 3: Hard
  score: integer('score').notNull(), // Points awarded for correct answer
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const scores = pgTable('scores', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  score: integer('score').notNull(),
  totalQuestions: integer('total_questions').notNull(),
  correctAnswers: integer('correct_answers').notNull(),
  timeSpent: integer('time_spent').notNull(), // in seconds
  createdAt: timestamp('created_at').defaultNow().notNull(),
}); 