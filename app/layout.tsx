import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ReduxProvider } from "../redux/provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QuizMaster - Online Quiz Platform",
  description: "Create and take quizzes with ease",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}

