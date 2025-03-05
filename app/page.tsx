import Link from "next/link"

export default function Home() {
  return (
    <>

      <div className="flex flex-col min-h-screen">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">QuizMaster</h1>
            <div className="flex gap-4">
              <Link href="/login">
                <button>Login</button>
              </Link>
              <Link href="/register">
                <button>Register</button>
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Create and Take Quizzes with Ease</h2>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                Create engaging quizzes, track performance, and analyze results all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <button  className="gap-2">
                    Get Started 
                  </button>
                </Link>
                <Link href="/demo">
                  <button>
                    Try Demo
                  </button>
                </Link>
              </div>
            </div>
          </section>
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Create Quizzes</h3>
                  <p className="text-gray-600">
                    Easily create quizzes with multiple-choice questions, set time limits, and add detailed solutions.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Take Quizzes</h3>
                  <p className="text-gray-600">
                    Practice with timed quizzes in a distraction-free environment designed for optimal learning.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Analyze Results</h3>
                  <p className="text-gray-600">
                    Review your performance with detailed analytics showing correct and incorrect answers.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>© 2024 QuizMaster. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
    
  )
}

