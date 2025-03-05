"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "../../../../../../redux/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import DashboardLayout from "../../../../../../components/layouts/dashboard-layout"
import Link from "next/link"

export default function QuizResultPage() {
  const params = useParams()
  const quizId = params.id as string
  const resultId = params.resultId as string
  const router = useRouter()

  const { quizzes, results } = useSelector((state: RootState) => state.quiz)
  const quiz = quizzes.find((q) => q.id === quizId)
  const result = results.find((r) => r.id === resultId)

  useEffect(() => {
    if (!quiz || !result) {
      router.push("/dashboard")
    }
  }, [quiz, result, router])

  if (!quiz || !result) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Quiz Results</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{quiz.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
              <div>
                <h3 className="font-medium">Your Score</h3>
                <p className="text-3xl font-bold">{result.score.toFixed(0)}%</p>
              </div>
              <div>
                <h3 className="font-medium">Completed</h3>
                <p>{new Date(result.completedAt).toLocaleString()}</p>
              </div>
            </div>

            <h3 className="font-medium text-lg mt-6">Question Review</h3>

            <div className="space-y-6">
              {quiz.questions.map((question, index) => {
                const userAnswer = result.answers.find((a) => a.questionId === question.id)
                const selectedOption = userAnswer
                  ? question.options.find((o) => o.id === userAnswer.selectedOptionId)
                  : null
                const isCorrect = selectedOption?.isCorrect || false

                return (
                  <Card
                    key={question.id}
                    className={`border-l-4 ${isCorrect ? "border-l-green-500" : "border-l-red-500"}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">Question {index + 1}</CardTitle>
                        {isCorrect ? (
                          <div className="flex items-center text-green-600 gap-1">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">Correct</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600 gap-1">
                            <XCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">Incorrect</span>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>{question.text}</p>

                      <div className="space-y-2">
                        {question.options.map((option) => {
                          const isSelected = option.id === userAnswer?.selectedOptionId
                          let className = "p-3 rounded-md border "

                          if (isSelected && option.isCorrect) {
                            className += "bg-green-50 border-green-200"
                          } else if (isSelected && !option.isCorrect) {
                            className += "bg-red-50 border-red-200"
                          } else if (!isSelected && option.isCorrect) {
                            className += "bg-green-50 border-green-200"
                          } else {
                            className += "bg-gray-50"
                          }

                          return (
                            <div key={option.id} className={className}>
                              <div className="flex items-start gap-2">
                                {isSelected && option.isCorrect && (
                                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                )}
                                {isSelected && !option.isCorrect && <XCircle className="h-5 w-5 text-red-600 mt-0.5" />}
                                {!isSelected && option.isCorrect && (
                                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                )}
                                <p>{option.text}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {question.solution && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-md">
                          <h4 className="font-medium mb-1">Solution</h4>
                          <p>{question.solution}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="flex justify-between mt-8">
              <Link href="/dashboard">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
              <Link href={`/dashboard/quizzes/${quiz.id}`}>
                <Button>Take Quiz Again</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

