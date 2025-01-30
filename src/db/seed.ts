import { db } from './config';
import { questions } from './schema';

// Score mapping based on difficulty
const DIFFICULTY_SCORES = {
  1: 100,  // Easy questions
  2: 200,  // Medium questions
  3: 300   // Hard questions
} as const;

const realMadridQuestions = [
  {
    text: "В каком году был основан Реал Мадрид?",
    options: ["1902", "1896", "1900", "1910"],
    correctOption: 0,
    difficulty: 2,
    score: DIFFICULTY_SCORES[2]
  },
  {
    text: "Кто является лучшим бомбардиром Реал Мадрида за всю историю?",
    options: ["Рауль", "Альфредо Ди Стефано", "Криштиану Роналду", "Ференц Пушкаш"],
    correctOption: 2,
    difficulty: 1,
    score: DIFFICULTY_SCORES[1]
  },
  {
    text: "Сколько титулов Лиги чемпионов УЕФА/Кубка европейских чемпионов выиграл Реал Мадрид?",
    options: ["10", "12", "14", "16"],
    correctOption: 2,
    difficulty: 1,
    score: DIFFICULTY_SCORES[1]
  },
  {
    text: "Как называется домашний стадион Реал Мадрида?",
    options: ["Камп Ноу", "Сантьяго Бернабеу", "Висенте Кальдерон", "Сан Сиро"],
    correctOption: 1,
    difficulty: 1,
    score: DIFFICULTY_SCORES[1]
  },
  {
    text: "Какой игрок был известен как 'Галактико' и играл в полузащите с 2001 по 2005 год?",
    options: ["Дэвид Бекхэм", "Луиш Фигу", "Зинедин Зидан", "Роналдо"],
    correctOption: 2,
    difficulty: 2,
    score: DIFFICULTY_SCORES[2]
  },
  {
    text: "Какой традиционный цвет домашней формы Реал Мадрида?",
    options: ["Синий", "Красный", "Белый", "Зеленый"],
    correctOption: 2,
    difficulty: 1,
    score: DIFFICULTY_SCORES[1]
  },
  {
    text: "Кто забил победный гол в финале Лиги чемпионов 2014 года против Атлетико Мадрид?",
    options: ["Серхио Рамос", "Гарет Бейл", "Криштиану Роналду", "Карим Бензема"],
    correctOption: 0,
    difficulty: 3,
    score: DIFFICULTY_SCORES[3]
  },
  {
    text: "Сколько Лиг чемпионов подряд выиграл Реал Мадрид между 2016 и 2018 годами?",
    options: ["Две", "Три", "Четыре", "Пять"],
    correctOption: 1,
    difficulty: 2,
    score: DIFFICULTY_SCORES[2]
  },
  {
    text: "Какой вратарь держит рекорд по количеству матчей за Реал Мадрид?",
    options: ["Икер Касильяс", "Франсиско Буйо", "Кейлор Навас", "Тибо Куртуа"],
    correctOption: 0,
    difficulty: 2,
    score: DIFFICULTY_SCORES[2]
  },
  {
    text: "В каком сезоне Реал Мадрид выиграл свой первый Кубок европейских чемпионов/Лигу чемпионов УЕФА?",
    options: ["1955/56", "1960/61", "1965/66", "1950/51"],
    correctOption: 0,
    difficulty: 3,
    score: DIFFICULTY_SCORES[3]
  },
  // Adding 30 new questions about 2015-present
  {
    text: "Кто был главным тренером Реал Мадрида, когда команда выиграла три Лиги чемпионов подряд (2016-2018)?",
    options: ["Карло Анчелотти", "Зинедин Зидан", "Хулен Лопетеги", "Хосе Моуринью"],
    correctOption: 1,
    difficulty: 1,
    score: DIFFICULTY_SCORES[1]
  },
  {
    text: "В каком году Карим Бензема получил 'Золотой мяч'?",
    options: ["2020", "2021", "2022", "2023"],
    correctOption: 2,
    difficulty: 1,
    score: DIFFICULTY_SCORES[1]
  },
  {
    text: "Кто забил решающий пенальти в финале Лиги чемпионов 2016 года против Атлетико Мадрид?",
    options: ["Криштиану Роналду", "Серхио Рамос", "Гарет Бейл", "Лука Модрич"],
    correctOption: 0,
    difficulty: 2,
    score: DIFFICULTY_SCORES[2]
  },
  {
    text: "В каком году Криштиану Роналду покинул Реал Мадрид?",
    options: ["2017", "2018", "2019", "2020"],
    correctOption: 1,
    difficulty: 1,
    score: DIFFICULTY_SCORES[1]
  },
  {
    text: "Кто стал капитаном Реал Мадрида после ухода Серхио Рамоса?",
    options: ["Карим Бензема", "Лука Модрич", "Марсело", "Тони Кроос"],
    correctOption: 0,
    difficulty: 1,
    score: DIFFICULTY_SCORES[1]
  },
  {
    text: "В каком году Эден Азар перешёл в Реал Мадрид?",
    options: ["2018", "2019", "2020", "2021"],
    correctOption: 1,
    difficulty: 1,
    score: DIFFICULTY_SCORES[1]
  },
  {
    text: "Кто забил победный гол в финале Лиги чемпионов 2022 года против Ливерпуля?",
    options: ["Карим Бензема", "Винисиус Жуниор", "Федерико Вальверде", "Родриго"],
    correctOption: 1,
    difficulty: 2,
    score: DIFFICULTY_SCORES[2]
  },
  {
    text: "Сколько голов забил Карим Бензема в сезоне 2021/22?",
    options: ["34", "44", "54", "64"],
    correctOption: 1,
    difficulty: 3,
    score: DIFFICULTY_SCORES[3]
  },
  {
    text: "В каком году стадион Сантьяго Бернабеу начал масштабную реконструкцию?",
    options: ["2018", "2019", "2020", "2021"],
    correctOption: 2,
    difficulty: 2,
    score: DIFFICULTY_SCORES[2]
  },
  {
    text: "Кто стал самым дорогим трансфером Реал Мадрида после 2015 года?",
    options: ["Эден Азар", "Орельен Тчуамени", "Джуд Беллингем", "Антонио Рюдигер"],
    correctOption: 0,
    difficulty: 2,
    score: DIFFICULTY_SCORES[2]
  },
  {
    text: "В каком году Зинедин Зидан покинул пост главного тренера во второй раз?",
    options: ["2019", "2020", "2021", "2022"],
    correctOption: 2,
    difficulty: 2,
    score: DIFFICULTY_SCORES[2]
  },
  {
    text: "Кто был признан лучшим игроком финала Лиги чемпионов 2022 года?",
    options: ["Тибо Куртуа", "Винисиус Жуниор", "Карим Бензема", "Лука Модрич"],
    correctOption: 0,
    difficulty: 2,
    score: DIFFICULTY_SCORES[2]
  },
  {
    text: "Какой номер получил Джуд Беллингем при переходе в Реал Мадрид?",
    options: ["5", "22", "7", "8"],
    correctOption: 0,
    difficulty: 2,
    score: DIFFICULTY_SCORES[2]
  },
  {
    text: "Кто забил 500-й гол Реал Мадрида в Лиге чемпионов?",
    options: ["Карим Бензема", "Тони Кроос", "Лука Модрич", "Винисиус Жуниор"],
    correctOption: 0,
    difficulty: 3,
    score: DIFFICULTY_SCORES[3]
  },
  {
    text: "В каком году Реал Мадрид выиграл свой последний Кубок Испании?",
    options: ["2021", "2022", "2023", "2024"],
    correctOption: 2,
    difficulty: 1,
    score: DIFFICULTY_SCORES[1]
  },
  {
    text: "Кто стал лучшим бомбардиром Реал Мадрида в сезоне 2022/23?",
    options: ["Карим Бензема", "Винисиус Жуниор", "Родриго", "Федерико Вальверде"],
    correctOption: 0,
    difficulty: 1,
    score: DIFFICULTY_SCORES[1]
  },
  {
    text: "Какой игрок Реал Мадрида выиграл награду Golden Boy в 2023 году?",
    options: ["Джуд Беллингем", "Эдуардо Камавинга", "Винисиус Жуниор", "Родриго"],
    correctOption: 0,
    difficulty: 2,
    score: DIFFICULTY_SCORES[2]
  },
  {
    text: "Сколько матчей без поражений провёл Реал Мадрид в групповом этапе Лиги чемпионов 2021/22?",
    options: ["4", "5", "6", "7"],
    correctOption: 2,
    difficulty: 3,
    score: DIFFICULTY_SCORES[3]
  },
  {
    text: "Кто был признан лучшим молодым игроком Ла Лиги в сезоне 2021/22?",
    options: ["Винисиус Жуниор", "Родриго", "Эдуардо Камавинга", "Федерико Вальверде"],
    correctOption: 0,
    difficulty: 2,
    score: DIFFICULTY_SCORES[2]
  },
  {
    text: "В каком году Тибо Куртуа перешёл в Реал Мадрид?",
    options: ["2017", "2018", "2019", "2020"],
    correctOption: 1,
    difficulty: 2,
    score: DIFFICULTY_SCORES[2]
  },
  {
    text: "Кто забил первый гол на обновлённом стадионе Сантьяго Бернабеу в 2023 году?",
    options: ["Джуд Беллингем", "Винисиус Жуниор", "Родриго", "Хоселу"],
    correctOption: 2,
    difficulty: 3,
    score: DIFFICULTY_SCORES[3]
  },
  {
    text: "Какой номер носил Эден Азар в Реал Мадриде?",
    options: ["7", "10", "23", "50"],
    correctOption: 0,
    difficulty: 1,
    score: DIFFICULTY_SCORES[1]
  },
  {
    text: "Кто стал первым трансфером Реал Мадрида летом 2023 года?",
    options: ["Джуд Беллингем", "Фран Гарсия", "Брахим Диас", "Арда Гюлер"],
    correctOption: 1,
    difficulty: 2,
    score: DIFFICULTY_SCORES[2]
  },
  {
    text: "Сколько голов забил Винисиус Жуниор в сезоне 2022/23 во всех турнирах?",
    options: ["15", "20", "23", "28"],
    correctOption: 2,
    difficulty: 3,
    score: DIFFICULTY_SCORES[3]
  },
  {
    text: "В каком году Карло Анчелотти вернулся в Реал Мадрид во второй раз?",
    options: ["2019", "2020", "2021", "2022"],
    correctOption: 2,
    difficulty: 1,
    score: DIFFICULTY_SCORES[1]
  },
  {
    text: "Кто забил решающий пенальти в финале Суперкубка Испании 2023 года против Валенсии?",
    options: ["Карим Бензема", "Лука Модрич", "Тони Кроос", "Родриго"],
    correctOption: 1,
    difficulty: 3,
    score: DIFFICULTY_SCORES[3]
  },
  {
    text: "Какой игрок Реал Мадрида получил награду Kopa Trophy в 2022 году?",
    options: ["Винисиус Жуниор", "Эдуардо Камавинга", "Родриго", "Гави"],
    correctOption: 1,
    difficulty: 2,
    score: DIFFICULTY_SCORES[2]
  },
  {
    text: "Сколько голов забил Джуд Беллингем в первых 15 матчах за Реал Мадрид?",
    options: ["8", "10", "13", "15"],
    correctOption: 2,
    difficulty: 2,
    score: DIFFICULTY_SCORES[2]
  },
  {
    text: "В каком году Реал Мадрид подписал контракт с Винисиусом Жуниором?",
    options: ["2017", "2018", "2019", "2020"],
    correctOption: 0,
    difficulty: 2,
    score: DIFFICULTY_SCORES[2]
  },
  {
    text: "Кто стал автором 1000-го гола Реал Мадрида в Ла Лиге в 21 веке?",
    options: ["Карим Бензема", "Лука Модрич", "Винисиус Жуниор", "Родриго"],
    correctOption: 0,
    difficulty: 3,
    score: DIFFICULTY_SCORES[3]
  }
];

async function seed() {
  try {
    for (const question of realMadridQuestions) {
      await db.insert(questions).values({
        text: question.text,
        options: question.options,
        correctOption: question.correctOption,
        difficulty: question.difficulty,
        score: question.score,
      });
    }
    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

seed(); 