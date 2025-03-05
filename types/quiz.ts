export interface QuestionOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface Question {
  id: string
  text: string
  options: QuestionOption[]
  timeLimit: number
  solution: string
}

export interface Quiz {
  id: string
  title: string
  description: string
  questions: Question[]
  createdAt: string
}

export interface UserAnswer {
  questionId: string
  selectedOptionId: string | null
  timeSpent: number
}

export interface QuizResult {
  id: string
  quizId: string
  score: number
  answers: UserAnswer[]
  completedAt: string
}

