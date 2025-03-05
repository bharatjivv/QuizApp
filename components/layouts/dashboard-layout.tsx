"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../redux/store"
import { logout } from "../../redux/slices/authSlice"
import Link from "next/link"
import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
import { Home, PlusCircle, BookOpen, Settings, LogOut, User } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    dispatch(logout())
    router.push("/login")
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-white border-r">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary">QuizMaster</h1>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4 px-3">
          <nav className="space-y-1">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/create-quiz">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <PlusCircle className="h-4 w-4" />
                Create Quiz
              </Button>
            </Link>
            <Link href="/dashboard/my-quizzes">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <BookOpen className="h-4 w-4" />
                My Quizzes
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </Link>
          </nav>
        </div>
        <div className="border-t p-4">
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 h-16 border-b bg-white flex items-center px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-primary">QuizMaster</h1>
        </Link>

        {/* <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/create-quiz" className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Create Quiz
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/my-quizzes" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  My Quizzes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </div>

      {/* Main content */}
      <div className="flex-1 md:pl-64">
        <main className="container mx-auto px-4 py-8 md:py-12 mt-16 md:mt-0">{children}</main>
      </div>
    </div>
  )
}

