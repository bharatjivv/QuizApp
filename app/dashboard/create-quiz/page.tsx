"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { addQuiz } from "../../../redux/slices/quizSlice";
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Trash2, ArrowLeft, Save } from "lucide-react"
import DashboardLayout from "../../../components/layouts/dashboard-layout"

import QuestionEditor from "../../../components/quiz/quiz-editor"
import type { Question, Quiz } from "../../../types/quiz"
import Link from "next/link"

export default function CreateQuizPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: uuidv4(),
      text: "",
      options: [
        { id: uuidv4(), text: "", isCorrect: false },
        { id: uuidv4(), text: "", isCorrect: false },
        { id: uuidv4(), text: "", isCorrect: false },
        { id: uuidv4(), text: "", isCorrect: false },
      ],
      timeLimit: 30,
      solution: "",
    },
  ])

  const router = useRouter()
  const dispatch = useDispatch()

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: uuidv4(),
        text: "",
        options: [
          { id: uuidv4(), text: "", isCorrect: false },
          { id: uuidv4(), text: "", isCorrect: false },
          { id: uuidv4(), text: "", isCorrect: false },
          { id: uuidv4(), text: "", isCorrect: false },
        ],
        timeLimit: 30,
        solution: "",
      },
    ])
  }

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id))
    }
  }

  const updateQuestion = (updatedQuestion: Question) => {
    setQuestions(questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate quiz
    if (!title.trim()) {
      alert("Please enter a quiz title")
      return
    }

    if (questions.some((q) => !q.text.trim())) {
      alert("Please fill in all question texts")
      return
    }

    if (questions.some((q) => q.options.some((o) => !o.text.trim()))) {
      alert("Please fill in all option texts")
      return
    }

    if (questions.some((q) => !q.options.some((o) => o.isCorrect))) {
      alert("Each question must have at least one correct answer")
      return
    }

    const newQuiz: Quiz = {
      id: uuidv4(),
      title,
      description,
      questions,
      createdAt: new Date().toISOString(),
    }

    dispatch(addQuiz(newQuiz))
    router.push("/dashboard")
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
          <h1 className="text-3xl font-bold">Create Quiz</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Details</CardTitle>
              <CardDescription>Enter the basic information about your quiz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Quiz Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter quiz title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a description for your quiz"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Questions</h2>
              <Button type="button" onClick={addQuestion} className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Question
              </Button>
            </div>

            {questions.map((question, index) => (
              <Card key={question.id} className="relative">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Question {index + 1}</CardTitle>
                    <CardDescription>Configure your question, options, and solution</CardDescription>
                  </div>
                  {questions.length > 1 && (
                    <Button type="button" variant="destructive" size="icon" onClick={() => removeQuestion(question.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <QuestionEditor question={question} onChange={updateQuestion} />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <Link href="/dashboard">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" />
              Save Quiz
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

