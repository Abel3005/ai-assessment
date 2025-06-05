import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Building2, Clock, Users, BookOpen, Code, Brain, Zap } from "lucide-react"
import Link from "next/link"

// 문제 데이터
const problems = [
  {
    id: "AI-001",
    title: "GPT-4o 프롬프트 최적화 전략",
    area: "프롬프트 작성 및 최적화",
    difficulty: "중급",
    type: "객관식",
    description: "멀티모달 LLM의 효과적인 프롬프트 설계 방법을 평가합니다.",
    timeLimit: "15분",
    participants: 1247,
    icon: Brain,
  },
  {
    id: "AI-002",
    title: "AI 편향성 검토 및 완화 방안",
    area: "결과 검증 및 윤리적 검토",
    difficulty: "고급",
    type: "주관식",
    description: "AI 모델의 편향성을 식별하고 완화하는 방법론을 서술합니다.",
    timeLimit: "30분",
    participants: 892,
    icon: BookOpen,
  },
  {
    id: "AI-003",
    title: "Zapier를 활용한 AI 워크플로우 구성",
    area: "노코딩 자동화 워크플로우 구성",
    difficulty: "초급",
    type: "노코딩",
    description: "노코드 도구를 사용하여 AI 기반 업무 자동화를 구현합니다.",
    timeLimit: "45분",
    participants: 2156,
    icon: Zap,
  },
  {
    id: "AI-004",
    title: "OpenAI API를 활용한 RAG 시스템 구현",
    area: "코딩 기반 AI API 사용 및 모델 파인튜닝",
    difficulty: "고급",
    type: "코딩",
    description: "검색 증강 생성(RAG) 시스템을 구현하고 성능을 최적화합니다.",
    timeLimit: "60분",
    participants: 743,
    icon: Code,
  },
  {
    id: "AI-005",
    title: "멀티모달 데이터 전처리 및 분석",
    area: "데이터 전처리 및 분석",
    difficulty: "중급",
    type: "객관식",
    description: "텍스트, 이미지, 음성 데이터의 통합 처리 방법을 평가합니다.",
    timeLimit: "20분",
    participants: 1534,
    icon: Brain,
  },
]

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

export default function ProblemsPage() {
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
            <nav className="flex items-center space-x-6">
              <Link href="/problems" className="text-blue-600 font-medium">
                문제 풀이
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                소개
              </Link>
              <Button>로그인</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">AI 활용 역량 평가 문제</h1>
          <p className="text-lg text-gray-600 mb-6">
            실제 기업에서 출제되는 AI 활용 역량 평가 문제들을 통해 실전 감각을 기르세요.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">전체 문제</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">참여자 수</p>
                    <p className="text-2xl font-bold text-gray-900">6,572</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">평균 소요시간</p>
                    <p className="text-2xl font-bold text-gray-900">34분</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-purple-600 rounded"></div>
                  <div>
                    <p className="text-sm text-gray-600">평균 정답률</p>
                    <p className="text-2xl font-bold text-gray-900">73%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Problems List */}
        <div className="space-y-6">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon
            return (
              <Card key={problem.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{problem.id}</Badge>
                          <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                          <Badge className={getTypeColor(problem.type)}>{problem.type}</Badge>
                        </div>
                        <CardTitle className="text-xl mb-2">{problem.title}</CardTitle>
                        <CardDescription className="text-gray-600 mb-3">{problem.description}</CardDescription>
                        <div className="text-sm text-gray-500 mb-2">
                          <strong>영역:</strong> {problem.area}
                        </div>
                      </div>
                    </div>
                    <Link href={`/problems/${problem.id}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700">문제 풀기</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>제한시간: {problem.timeLimit}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{problem.participants.toLocaleString()}명 참여</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>진행률</span>
                      <Progress value={Math.random() * 100} className="w-20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            더 많은 문제 보기
          </Button>
        </div>
      </div>
    </div>
  )
}
