"use server"
import { getCurrentUser } from "@/app/actions/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  BookOpen,
  Trophy,
  Clock,
  TrendingUp,
  Target,
  CheckCircle,
  XCircle,
  Calendar,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { LogoutButton } from "@/components/logout-button"
import { Header } from "@/components/header"

// 임시 사용자 진도 데이터
const getUserProgress = (userId: string) => {
  return {
    totalProblems: 5,
    solvedProblems: 3,
    correctAnswers: 2,
    totalTime: 45, // 분
    streak: 3, // 연속 학습 일수
    lastActivity: "2024-01-15",
    recentResults: [
      { id: "AI-001", title: "GPT-4o 프롬프트 최적화", correct: true, time: 12, date: "2024-01-15" },
      { id: "AI-003", title: "Zapier 워크플로우 구성", correct: true, time: 25, date: "2024-01-14" },
      { id: "AI-002", title: "AI 편향성 검토", correct: false, time: 18, date: "2024-01-13" },
    ],
    weakAreas: [
      { area: "결과 검증 및 윤리적 검토", accuracy: 40 },
      { area: "코딩 기반 AI API 사용", accuracy: 60 },
    ],
    strongAreas: [
      { area: "프롬프트 작성 및 최적화", accuracy: 90 },
      { area: "노코딩 자동화 워크플로우", accuracy: 85 },
    ],
  }
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  const progress = getUserProgress(user.id)
  const accuracyRate = Math.round((progress.correctAnswers / progress.solvedProblems) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header user={user}/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">학습 대시보드</h1>
          <p className="text-lg text-gray-600">
            안녕하세요, {user.name}님! 오늘도 AI 역량 향상을 위해 함께 학습해보세요.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">풀이한 문제</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {progress.solvedProblems}/{progress.totalProblems}
                  </p>
                </div>
              </div>
              <Progress value={(progress.solvedProblems / progress.totalProblems) * 100} className="mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Trophy className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">정답률</p>
                  <p className="text-3xl font-bold text-gray-900">{accuracyRate}%</p>
                </div>
              </div>
              <Progress value={accuracyRate} className="mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">총 학습시간</p>
                  <p className="text-3xl font-bold text-gray-900">{progress.totalTime}분</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                평균 {Math.round(progress.totalTime / progress.solvedProblems)}분/문제
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">연속 학습</p>
                  <p className="text-3xl font-bold text-gray-900">{progress.streak}일</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">마지막 활동: {progress.lastActivity}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>최근 풀이 기록</span>
              </CardTitle>
              <CardDescription>최근에 풀이한 문제들의 결과입니다</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progress.recentResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {result.correct ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{result.title}</p>
                        <p className="text-sm text-gray-500">{result.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={result.correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {result.correct ? "정답" : "오답"}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">{result.time}분</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/problems">
                  <Button className="w-full">더 많은 문제 풀기</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Performance Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>영역별 성과 분석</span>
              </CardTitle>
              <CardDescription>각 영역별 학습 성과를 확인하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Target className="h-4 w-4 text-green-600" />
                    <span>강점 영역</span>
                  </h4>
                  <div className="space-y-3">
                    {progress.strongAreas.map((area, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{area.area}</span>
                          <span className="text-green-600 font-medium">{area.accuracy}%</span>
                        </div>
                        <Progress value={area.accuracy} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Target className="h-4 w-4 text-red-600" />
                    <span>개선 필요 영역</span>
                  </h4>
                  <div className="space-y-3">
                    {progress.weakAreas.map((area, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{area.area}</span>
                          <span className="text-red-600 font-medium">{area.accuracy}%</span>
                        </div>
                        <Progress value={area.accuracy} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Link href="/about">
                    <Button variant="outline" className="w-full">
                      학습 가이드 보기
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>맞춤 학습 추천</CardTitle>
            <CardDescription>현재 학습 상태를 바탕으로 추천하는 다음 단계입니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg bg-blue-50">
                <h4 className="font-semibold text-blue-900 mb-2">추천 문제</h4>
                <p className="text-blue-800 text-sm mb-3">AI 편향성 검토 영역의 추가 학습이 필요합니다</p>
                <Link href="/problems/AI-002">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    문제 풀기
                  </Button>
                </Link>
              </div>

              <div className="p-4 border rounded-lg bg-green-50">
                <h4 className="font-semibold text-green-900 mb-2">학습 목표</h4>
                <p className="text-green-800 text-sm mb-3">이번 주 목표: 2문제 더 풀기 (현재 3/5)</p>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  목표 설정
                </Button>
              </div>

              <div className="p-4 border rounded-lg bg-purple-50">
                <h4 className="font-semibold text-purple-900 mb-2">학습 리소스</h4>
                <p className="text-purple-800 text-sm mb-3">AI 윤리 관련 추가 자료를 확인해보세요</p>
                <Link href="/about">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    자료 보기
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
