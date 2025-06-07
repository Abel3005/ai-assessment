"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Building2, Clock, ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

// 문제 데이터 (실제로는 API에서 가져올 것)
const problemData = {
  "AI-001": {
    문제ID: "AI-001",
    영역: "프롬프트 작성 및 최적화",
    난이도: "중급",
    문제유형: "객관식",
    문제: "GPT-4o와 같은 멀티모달 대규모 언어모델(LLM)에서 이미지와 텍스트를 함께 처리할 때, 가장 효과적인 프롬프트 설계 전략은 무엇입니까?",
    보기: [
      "이미지 설명을 먼저 요청한 후, 별도의 프롬프트로 텍스트 작업을 수행한다",
      "이미지와 텍스트 작업을 하나의 통합된 프롬프트로 구성하고, 명확한 작업 순서를 제시한다",
      "텍스트 작업만 프롬프트에 포함하고, 이미지는 자동으로 처리되도록 한다",
      "이미지 처리와 텍스트 처리를 완전히 분리하여 각각 다른 모델을 사용한다",
    ],
    정답: "이미지와 텍스트 작업을 하나의 통합된 프롬프트로 구성하고, 명확한 작업 순서를 제시한다",
    해설: "멀티모달 LLM의 핵심 장점은 여러 모달리티를 동시에 처리할 수 있다는 점입니다. 통합된 프롬프트로 구성하되 명확한 작업 순서를 제시하면, 모델이 이미지와 텍스트 간의 관계를 더 잘 이해하고 일관성 있는 결과를 생성할 수 있습니다.",
    평가기준: "멀티모달 LLM의 특성 이해도 및 효율적인 프롬프트 설계 능력",
  },
}

export default function ProblemDetailPage({ params }: { params: { id: string } }) {
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15분

  const problem = problemData[params.id as keyof typeof problemData]

  if (!problem) {
    return <div>문제를 찾을 수 없습니다.</div>
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const isCorrect = selectedAnswer === problem.정답

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "초급":
        return "bg-green-100 text-green-800"
      case "중급":
        return "bg-yellow-100 text-yellow-800"
      case "고급":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "객관식":
        return "bg-blue-100 text-blue-800"
      case "주관식":
        return "bg-purple-100 text-purple-800"
      case "노코딩":
        return "bg-orange-100 text-orange-800"
      case "코딩":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI Assessment Hub</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
              <Button>로그인</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/problems" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4" />
            <span>문제 목록으로 돌아가기</span>
          </Link>
        </div>

        {/* Problem Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{problem.문제ID}</Badge>
                <Badge className={getDifficultyColor(problem.난이도)}>{problem.난이도}</Badge>
                <Badge className={getTypeColor(problem.문제유형)}>{problem.문제유형}</Badge>
              </div>
              <Progress value={submitted ? 100 : 50} className="w-32" />
            </div>
            <CardTitle className="text-2xl mb-2">GPT-4o 프롬프트 최적화 전략</CardTitle>
            <CardDescription className="text-lg">
              <strong>영역:</strong> {problem.영역}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Problem Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>문제</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed mb-6">{problem.문제}</p>

            {!submitted ? (
              <div className="space-y-4">
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  {problem.보기.map((option, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={option} id={`option-${index}`} className="mt-1" />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base leading-relaxed">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-end pt-6">
                  <Button
                    onClick={handleSubmit}
                    disabled={!selectedAnswer}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    답안 제출
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* 결과 표시 */}
                <div
                  className={`p-4 rounded-lg border-2 ${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600" />
                    )}
                    <span className={`font-semibold text-lg ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                      {isCorrect ? "정답입니다!" : "오답입니다."}
                    </span>
                  </div>
                  <p className={`${isCorrect ? "text-green-700" : "text-red-700"}`}>선택한 답: {selectedAnswer}</p>
                  {!isCorrect && <p className="text-green-700 mt-2">정답: {problem.정답}</p>}
                </div>

                {/* 해설 */}
                <Card>
                  <CardHeader>
                    <CardTitle>해설</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-4">{problem.해설}</p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">평가 기준</h4>
                      <p className="text-blue-800">{problem.평가기준}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* 다음 액션 */}
                <div className="flex justify-between">
                  <Link href="/problems">
                    <Button variant="outline">문제 목록으로</Button>
                  </Link>
                  <Link href="/problems/AI-002">
                    <Button className="bg-blue-600 hover:bg-blue-700">다음 문제</Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
