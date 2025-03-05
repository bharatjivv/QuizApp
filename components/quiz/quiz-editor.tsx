"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import type { Question } from "../../types/quiz"

interface QuestionEditorProps {
  question: Question
  onChange: (question: Question) => void
}

export default function QuestionEditor({ question, onChange }: QuestionEditorProps) {
  const updateQuestionText = (text: string) => {
    onChange({
      ...question,
      text,
    })
  }

  const updateQuestionTimeLimit = (timeLimit: number) => {
    onChange({
      ...question,
      timeLimit,
    })
  }

  const updateQuestionSolution = (solution: string) => {
    onChange({
      ...question,
      solution,
    })
  }

  const updateOption = (optionId: string, text: string) => {
    onChange({
      ...question,
      options: question.options.map((option) => (option.id === optionId ? { ...option, text } : option)),
    })
  }

  const toggleOptionCorrect = (optionId: string) => {
    onChange({
      ...question,
      options: question.options.map((option) =>
        option.id === optionId ? { ...option, isCorrect: !option.isCorrect } : option,
      ),
    })
  }

  const addOption = () => {
    if (question.options.length < 6) {
      onChange({
        ...question,
        options: [...question.options, { id: uuidv4(), text: "", isCorrect: false }],
      })
    }
  }

  const removeOption = (optionId: string) => {
    if (question.options.length > 2) {
      onChange({
        ...question,
        options: question.options.filter((option) => option.id !== optionId),
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor={`question-${question.id}`}>Question Text</Label>
        <Textarea
          id={`question-${question.id}`}
          value={question.text}
          onChange={(e) => updateQuestionText(e.target.value)}
          placeholder="Enter your question"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>Time Limit (seconds)</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[question.timeLimit]}
            onValueChange={(value) => updateQuestionTimeLimit(value[0])}
            min={10}
            max={120}
            step={5}
            className="flex-1"
          />
          <span className="w-12 text-center">{question.timeLimit}s</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>Answer Options</Label>
          {question.options.length < 6 && (
            <Button type="button" variant="outline" size="sm" onClick={addOption} className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              Add Option
            </Button>
          )}
        </div>

        {question.options.map((option, index) => (
          <div key={option.id} className="flex items-center gap-3">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <Label htmlFor={`option-${option.id}`} className="text-sm">
                  Option {index + 1}
                </Label>
                <div className="flex items-center gap-1.5">
                  <Switch
                    id={`correct-${option.id}`}
                    checked={option.isCorrect}
                    onCheckedChange={() => toggleOptionCorrect(option.id)}
                  />
                  <Label htmlFor={`correct-${option.id}`} className="text-xs">
                    Correct
                  </Label>
                </div>
              </div>
              <Input
                id={`option-${option.id}`}
                value={option.text}
                onChange={(e) => updateOption(option.id, e.target.value)}
                placeholder={`Enter option ${index + 1}`}
              />
            </div>
            {question.options.length > 2 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeOption(option.id)}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`solution-${question.id}`}>Solution (Optional)</Label>
        <Textarea
          id={`solution-${question.id}`}
          value={question.solution}
          onChange={(e) => updateQuestionSolution(e.target.value)}
          placeholder="Explain the correct answer"
          rows={2}
        />
      </div>
    </div>
  )
}

