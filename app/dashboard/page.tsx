"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, BookOpen, BarChart3 } from "lucide-react"
import DashboardLayout from "../../components/layouts/dashboard-layout";

export default function DashboardPage() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { quizzes } = useSelector((state: RootState) => state.quiz)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link href="/dashboard/create-quiz">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Quiz
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{quizzes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Quizzes Taken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0%</div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mt-8">Your Quizzes</h2>

        {quizzes.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center space-y-3">
                <h3 className="text-lg font-medium">No quizzes yet</h3>
                <p className="text-muted-foreground">Create your first quiz to get started</p>
                <Link href="/dashboard/create-quiz">
                  <Button className="mt-2 gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Create Quiz
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz) => (
              <Card key={quiz.id}>
                <CardHeader>
                  <CardTitle>{quiz.title}</CardTitle>
                  <CardDescription>{quiz.questions.length} questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">{quiz.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link href={`/dashboard/quizzes/${quiz.id}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <BookOpen className="h-4 w-4" />
                      Take Quiz
                    </Button>
                  </Link>
                  <Link href={`/dashboard/quizzes/${quiz.id}/results`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Results
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

