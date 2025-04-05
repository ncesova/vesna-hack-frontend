interface AnalyzeResponse {
  id: string,
  resume: string,
  acts: Regulation[],
  suggestions: Suggestion[],
}

interface Regulation {
  id: string,
  title: string, // "Федеральный закон № 152-ФЗ",
  description: string, // "О персональных данных"
  relevance: number, // 95 
  sections: string[], // ["Хранение данных", "Согласие пользователя", "Обработка данных"],
  url: string,
}

interface Suggestion {
  id: string, // "1",
  regulation: string, //'ФЗ-152 "О персональных данных"',
  articles: string, // "ст. 6, 18",
  requirement: string, //  "требует получения согласия пользователей на обработку персональных данных",
  status: string, // "critical",
  action: string, // "Добавить форму согласия на обработку персональных данных",
}
