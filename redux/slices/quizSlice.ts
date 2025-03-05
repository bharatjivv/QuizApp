import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Quiz, QuizResult } from "../../types/quiz"

interface QuizState {
  quizzes: Quiz[]
  results: QuizResult[]
}

const initialState: QuizState = {
  quizzes: [],
  results: [],
}

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes.push(action.payload)
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      const index = state.quizzes.findIndex((quiz) => quiz.id === action.payload.id)
      if (index !== -1) {
        state.quizzes[index] = action.payload
      }
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((quiz) => quiz.id !== action.payload)
      state.results = state.results.filter((result) => result.quizId !== action.payload)
    },
    addResult: (state, action: PayloadAction<QuizResult>) => {
      state.results.push(action.payload)
    },
  },
})

export const { addQuiz, updateQuiz, deleteQuiz, addResult } = quizSlice.actions
export default quizSlice.reducer

