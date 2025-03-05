"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../../../redux/store"
import { addResult } from "../../../../redux/slices/quizSlice"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Clock } from "lucide-react"
import DashboardLayout from "../../../../components/layouts/dashboard-layout"
import type { QuizResult, UserAnswer } from "../../../../types/quiz"
import Link from "next/link"

export default function TakeQuizPage() {
  const params = useParams()
  const quizId = params.id as string
  const router = useRouter()
  const dispatch = useDispatch()

  const { quizzes } = useSelector((state: RootState) => state.quiz)
  const quiz = quizzes.find((q) => q.id === quizId)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  useEffect(() => {
    if (!quiz) {
      router.push("/dashboard")
    }
  }, [quiz, router])

  // useEffect(() => {
  //   if (quiz && quizStarted && !quizCompleted) {
  //     const currentQuestion = quiz.questions[currentQuestionIndex]
  //     setTimeLeft(currentQuestion.timeLimit)

  //     const timer = setInterval(() => {
  //       setTimeLeft((prev) => {
  //         if (prev <= 1) {
  //           clearInterval(timer)
  //           handleNextQuestion()
  //           return 0
  //         }
  //         return prev - 1
  //       })
  //     }, 1000)

  //     return () => clearInterval(timer)
  //   }
  // }, [currentQuestionIndex, quizStarted, quizCompleted, quiz])




  useEffect(() => {
    if (quiz && quizStarted && !quizCompleted) {
      const currentQuestion = quiz.questions[currentQuestionIndex]
      setTimeLeft(currentQuestion.timeLimit)
  
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
  
            // Move handleNextQuestion logic here directly
            if (currentQuestionIndex < quiz.questions.length - 1) {
              setCurrentQuestionIndex(currentQuestionIndex + 1)
            } else {
              setQuizCompleted(true)
            }
  
            return 0
          }
          return prev - 1
        })
      }, 1000)
  
      return () => clearInterval(timer)
    }
  }, [currentQuestionIndex, quizStarted, quizCompleted, quiz])
  



  if (!quiz) {
    return null
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  const startQuiz = () => {
    setQuizStarted(true)
    setUserAnswers([])
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setQuizCompleted(false)
  }

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleNextQuestion = () => {
    // Save the current answer
    const answer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOptionId: selectedOption,
      timeSpent: currentQuestion.timeLimit - timeLeft,
    }

    setUserAnswers((prev) => [...prev, answer])

    // Move to next question or finish quiz
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedOption(null)
    } else {
      finishQuiz([...userAnswers, answer])
    }
  }

  const finishQuiz = (answers: UserAnswer[]) => {
    setQuizCompleted(true)

    // Calculate score
    let correctAnswers = 0

    answers.forEach((answer) => {
      const question = quiz.questions.find((q) => q.id === answer.questionId)
      if (question) {
        const selectedOption = question.options.find((o) => o.id === answer.selectedOptionId)
        if (selectedOption && selectedOption.isCorrect) {
          correctAnswers++
        }
      }
    })

    const score = (correctAnswers / quiz.questions.length) * 100

    // Create result object
    const result: QuizResult = {
      id: uuidv4(),
      quizId: quiz.id,
      score,
      answers,
      completedAt: new Date().toISOString(),
    }

    // Save result to Redux
    dispatch(addResult(result))

    // Navigate to results page
    router.push(`/dashboard/quizzes/${quiz.id}/results/${result.id}`)
  }

  if (!quizStarted) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">{quiz.title}</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quiz Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Description</h3>
                <p className="text-muted-foreground">{quiz.description || "No description provided"}</p>
              </div>
              <div>
                <h3 className="font-medium">Number of Questions</h3>
                <p>{quiz.questions.length}</p>
              </div>
              <div>
                <h3 className="font-medium">Time Limit</h3>
                <p>Each question has its own time limit</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={startQuiz} className="w-full">
                Start Quiz
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{quiz.title}</h1>
          <div className="flex items-center gap-2 text-lg font-medium">
            <Clock className="h-5 w-5" />
            {timeLeft} seconds
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="min-h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl">{currentQuestion.text}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <RadioGroup value={selectedOption || ""} onValueChange={handleOptionSelect} className="space-y-3">
              {currentQuestion.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleOptionSelect(option.id)}
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleNextQuestion} className="gap-2">
              {currentQuestionIndex < quiz.questions.length - 1 ? (
                <>
                  Next <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                "Finish Quiz"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}

