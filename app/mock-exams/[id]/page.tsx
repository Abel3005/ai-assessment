"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Building2, Clock, ArrowLeft, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { mockExams } from "@/data/mock-exam"

// 문제 타입 정의
interface Problem {
  id: string
  title: string
  type: "객관식" | "주관식" | "노코딩" | "코딩"
  difficulty: "초급" | "중급" | "고급"
  question: string
  area: string
  options?: string[]
  answer?: string
}

// 모의고사 문제 예시 데이터
const mockProblems: Problem[] = [
  {
    id: "AI-001",
    title: "GPT-4o 프롬프트 최적화 전략",
    type: "객관식",
    difficulty: "중급",
    area: "프롬프트 작성 및 최적화",
    question:
      "GPT-4o와 같은 멀티모달 대규모 언어모델(LLM)에서 이미지와 텍스트를 함께 처리할 때, 가장 효과적인 프롬프트 설계 전략은 무엇입니까?",
    options: [
      "이미지 설명을 먼저 요청한 후, 별도의 프롬프트로 텍스트 작업을 수행한다",
      "이미지와 텍스트 작업을 하나의 통합된 프롬프트로 구성하고, 명확한 작업 순서를 제시한다",
      "텍스트 작업만 프롬프트에 포함하고, 이미지는 자동으로 처리되도록 한다",
      "이미지 처리와 텍스트 처리를 완전히 분리하여 각각 다른 모델을 사용한다",
    ],
    answer: "이미지와 텍스트 작업을 하나의 통합된 프롬프트로 구성하고, 명확한 작업 순서를 제시한다",
  },
  {
    id: "AI-002",
    title: "AI 편향성 검토 및 완화 방안",
    type: "주관식",
    difficulty: "고급",
    area: "결과 검증 및 윤리적 검토",
    question:
      "귀하의 회사에서 채용 과정에 AI 기반 이력서 스크리닝 시스템을 도입하려고 합니다. 이 시스템이 특정 성별이나 연령대에 편향된 결과를 보일 가능성이 있다는 우려가 제기되었습니다. AI 편향성을 식별하고 완화하기 위한 구체적인 방법론과 실행 계획을 3단계로 나누어 서술하시오.",
  },
  {
    id: "AI-003",
    title: "Zapier를 활용한 AI 워크플로우 구성",
    type: "노코딩",
    difficulty: "초급",
    area: "노코딩 자동화 워크플로우 구성",
    question:
      "마케팅 팀에서 매일 아침 9시에 전날의 웹사이트 방문자 데이터를 Google Analytics에서 추출하여, ChatGPT API를 통해 간단한 분석 리포트를 생성하고, 이를 Slack 채널에 자동으로 전송하는 워크플로우를 Zapier를 사용하여 구성하시오.",
  },
  {
    id: "AI-004",
    title: "OpenAI API를 활용한 RAG 시스템 구현",
    type: "코딩",
    difficulty: "고급",
    area: "코딩 기반 AI API 사용 및 모델 파인튜닝",
    question:
      "회사의 고객 지원 문서(PDF, 웹페이지, FAQ)를 기반으로 한 RAG(Retrieval-Augmented Generation) 시스템을 구현하시오. OpenAI의 Embedding API와 GPT-4 API를 사용하여, 사용자 질문에 대해 관련 문서를 검색하고 정확한 답변을 생성하는 Python 코드를 작성하시오.",
  },
  {
    id: "AI-005",
    title: "멀티모달 데이터 전처리 및 분석",
    type: "객관식",
    difficulty: "중급",
    area: "데이터 전처리 및 분석",
    question:
      "멀티모달 AI 모델 학습을 위해 텍스트, 이미지, 음성 데이터를 통합 처리할 때, 각 모달리티 간의 정보 불균형을 해결하기 위한 가장 적절한 전처리 전략은 무엇입니까?",
    options: [
      "모든 모달리티를 동일한 차원으로 축소하여 단순 연결(concatenation)한다",
      "각 모달리티별로 별도의 정규화를 적용한 후, 가중 평균을 통해 통합한다",
      "모달리티별 특성을 고려한 개별 인코딩 후, 어텐션 메커니즘을 통해 동적 가중치를 적용한다",
      "가장 정보량이 많은 모달리티만 사용하고 나머지는 보조 정보로만 활용한다",
    ],
  },
]

// 나머지 15개 문제 생성 함수
const generateRemainingProblems = (): Problem[] => {
  const remainingProblems: Problem[] = []
  const types = ["객관식", "주관식", "노코딩", "코딩"]
  const difficulties = ["초급", "중급", "고급"]
  const areas = [
    "프롬프트 작성 및 최적화",
    "결과 검증 및 윤리적 검토",
    "노코딩 자동화 워크플로우 구성",
    "코딩 기반 AI API 사용",
    "데이터 전처리 및 분석",
    "AI 모델 선택 및 활용",
  ]

  for (let i = 6; i <= 20; i++) {
    const type = types[Math.floor(Math.random() * types.length)] as "객관식" | "주관식" | "노코딩" | "코딩"
    const problem: Problem = {
      id: `AI-${i.toString().padStart(3, "0")}`,
      title: `AI 문제 ${i}`,
      type: type,
      difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as "초급" | "중급" | "고급",
      area: areas[Math.floor(Math.random() * areas.length)],
      question: `이것은 모의고사 문제 ${i}의 내용입니다. 실제 구현 시에는 더 구체적인 문제가 제공됩니다.`,
    }

    if (type === "객관식") {
      problem.options = ["객관식 보기 1", "객관식 보기 2", "객관식 보기 3", "객관식 보기 4"]
    }

    remainingProblems.push(problem)
  }

  return remainingProblems
}

// 문제 상태 타입 정의
interface ProblemState {
  submitted: boolean
  userAnswer: string | null
  isCorrect?: boolean
}

export default function MockExamDetailPage({ params }: { params: { id: string } }) {
  const [isStarted, setIsStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [subjectiveAnswer, setSubjectiveAnswer] = useState("")
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60) // 3시간(초 단위)

  // 모든 문제의 상태를 관리하는 배열
  const [problemStates, setProblemStates] = useState<ProblemState[]>([])

  // 모의고사 데이터 찾기
  const exam = mockExams.find((e) => e.id === params.id)

  // 모든 문제 데이터 (예시 문제 + 생성된 문제)
  const allProblems = [...mockProblems, ...generateRemainingProblems()].slice(0, 20)

  // 컴포넌트 마운트 시 문제 상태 초기화
  useEffect(() => {
    // 각 문제마다 초기 상태 설정
    setProblemStates(
      allProblems.map(() => ({
        submitted: false,
        userAnswer: null,
      })),
    )
  }, [])

  // 타이머 설정
  useEffect(() => {
    if (isStarted && !isCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [isStarted, isCompleted, timeLeft])

  if (!exam) {
    return <div>모의고사를 찾을 수 없습니다.</div>
  }

  const IconComponent = exam.icon
  const currentProblem = allProblems[currentProblemIndex]

  // 시간 포맷팅 함수
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // 문제 제출 처리 함수
  const handleSubmitProblem = () => {
    // 현재 문제의 상태 업데이트
    const newProblemStates = [...problemStates]

    // 객관식인 경우 정답 체크
    let isCorrect = undefined
    if (currentProblem.type === "객관식" && currentProblem.answer) {
      isCorrect = selectedAnswer === currentProblem.answer
    }

    newProblemStates[currentProblemIndex] = {
      submitted: true,
      userAnswer: currentProblem.type === "객관식" ? selectedAnswer : subjectiveAnswer,
      isCorrect,
    }

    setProblemStates(newProblemStates)
  }

  // 다음 문제로 이동
  const goToNextProblem = () => {
    // 현재 문제가 제출되지 않았다면 먼저 제출
    if (!problemStates[currentProblemIndex]?.submitted) {
      handleSubmitProblem()
    }

    // 다음 문제로 이동
    if (currentProblemIndex < allProblems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1)
      setSelectedAnswer("")
      setSubjectiveAnswer("")
    }
  }

  // 이전 문제로 이동
  const goToPreviousProblem = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex(currentProblemIndex - 1)

      // 이전에 선택한 답변 복원
      const prevState = problemStates[currentProblemIndex - 1]
      if (prevState) {
        if (allProblems[currentProblemIndex - 1].type === "객관식") {
          setSelectedAnswer(prevState.userAnswer || "")
        } else {
          setSubjectiveAnswer(prevState.userAnswer || "")
        }
      }
    }
  }

  // 특정 문제로 이동
  const goToProblem = (index: number) => {
    setCurrentProblemIndex(index)

    // 선택한 문제의 이전 답변 복원
    const state = problemStates[index]
    if (state) {
      if (allProblems[index].type === "객관식") {
        setSelectedAnswer(state.userAnswer || "")
      } else {
        setSubjectiveAnswer(state.userAnswer || "")
      }
    } else {
      setSelectedAnswer("")
      setSubjectiveAnswer("")
    }
  }

  // 모의고사 완료 처리
  const completeExam = () => {
    // 아직 제출하지 않은 문제가 있다면 확인
    const unansweredCount = problemStates.filter((state) => !state.submitted).length

    if (unansweredCount > 0) {
      if (!confirm(`아직 ${unansweredCount}개의 문제를 제출하지 않았습니다. 모의고사를 완료하시겠습니까?`)) {
        return
      }
    }

    setIsCompleted(true)
  }

  // 모의고사 결과 계산
  const calculateResults = () => {
    const totalProblems = allProblems.length
    const answeredProblems = problemStates.filter((state) => state.submitted).length
    const correctProblems = problemStates.filter((state) => state.isCorrect === true).length
    const incorrectProblems = problemStates.filter((state) => state.isCorrect === false).length
    const unansweredProblems = totalProblems - answeredProblems

    // 객관식 문제만 정답률 계산 (주관식/노코딩/코딩은 자동 채점 불가)
    const objectiveProblems = allProblems.filter((p) => p.type === "객관식").length
    const objectiveAnswered = problemStates.filter(
      (state, index) => allProblems[index].type === "객관식" && state.submitted,
    ).length
    const objectiveCorrect = problemStates.filter(
      (state, index) => allProblems[index].type === "객관식" && state.isCorrect === true,
    ).length

    const accuracyRate = objectiveAnswered > 0 ? Math.round((objectiveCorrect / objectiveAnswered) * 100) : 0

    return {
      totalProblems,
      answeredProblems,
      correctProblems,
      incorrectProblems,
      unansweredProblems,
      objectiveProblems,
      objectiveCorrect,
      accuracyRate,
    }
  }

  // 문제 번호 표시 컴포넌트
  const ProblemNumberIndicator = () => {
    return (
      <div className="flex flex-wrap gap-2 mb-6">
        {allProblems.map((_, index) => (
          <button
            key={index}
            onClick={() => (isStarted && !isCompleted ? goToProblem(index) : undefined)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors
              ${
                currentProblemIndex === index && isStarted && !isCompleted
                  ? "bg-blue-600 text-white"
                  : problemStates[index]?.submitted
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            disabled={!isStarted || isCompleted}
          >
            {index + 1}
          </button>
        ))}
      </div>
    )
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
              {isStarted && !isCompleted && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="h-5 w-5" />
                  <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                </div>
              )}
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

        {!isStarted ? (
          <>
            {/* Mock Exam Info */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline">{exam.id}</Badge>
                      <Badge
                        className={`${
                          exam.difficulty === "초급"
                            ? "bg-green-100 text-green-800"
                            : exam.difficulty === "중급"
                              ? "bg-yellow-100 text-yellow-800"
                              : exam.difficulty === "고급"
                                ? "bg-red-100 text-red-800"
                                : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {exam.difficulty}
                      </Badge>
                      {exam.company && <Badge className="bg-blue-100 text-blue-800">{exam.company}</Badge>}
                    </div>
                    <CardTitle className="text-2xl">{exam.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-lg">{exam.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {exam.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">모의고사 정보</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex items-center justify-between">
                            <span className="text-gray-600">문제 수</span>
                            <span className="font-medium">{exam.problemCount}문제</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-600">제한 시간</span>
                            <span className="font-medium">{exam.timeLimit}</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-600">난이도</span>
                            <span className="font-medium">{exam.difficulty}</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-600">등록일</span>
                            <span className="font-medium">{exam.createdAt}</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">응시자 통계</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex items-center justify-between">
                            <span className="text-gray-600">총 응시자</span>
                            <span className="font-medium">{exam.participants.toLocaleString()}명</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-600">평균 점수</span>
                            <span className="font-medium">{Math.floor(60 + Math.random() * 25)}점</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-600">합격률</span>
                            <span className="font-medium">{Math.floor(50 + Math.random() * 30)}%</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-600">평균 소요시간</span>
                            <span className="font-medium">
                              {Math.floor(exam.timeLimit.includes("3") ? 150 : 120) + Math.floor(Math.random() * 30)}분
                            </span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-2">모의고사 응시 안내</h4>
                        <ul className="text-yellow-700 space-y-1 text-sm">
                          <li>
                            • 모의고사는 총 {exam.problemCount}문제로 구성되어 있으며, 제한 시간은 {exam.timeLimit}
                            입니다.
                          </li>
                          <li>• 객관식, 주관식, 노코딩, 코딩 등 다양한 유형의 문제가 출제됩니다.</li>
                          <li>• 한 번 제출한 답안은 수정할 수 없으니 신중하게 답변해주세요.</li>
                          <li>• 모의고사 시작 후에는 중간에 저장되며, 나중에 이어서 풀 수 있습니다.</li>
                          <li>• 모든 문제를 풀지 않아도 제한 시간 종료 시 자동으로 제출됩니다.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pt-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsStarted(true)}>
                  모의고사 시작하기
                </Button>
              </CardFooter>
            </Card>

            {/* Problem Preview */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">출제 문제 미리보기</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allProblems.slice(0, 4).map((problem, index) => (
                  <Card key={index} className="hover:bg-gray-50 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{problem.id}</Badge>
                        <Badge
                          className={`${
                            problem.type === "객관식"
                              ? "bg-blue-100 text-blue-800"
                              : problem.type === "주관식"
                                ? "bg-purple-100 text-purple-800"
                                : problem.type === "노코딩"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-pink-100 text-pink-800"
                          }`}
                        >
                          {problem.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium text-gray-900">{problem.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{problem.area}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center text-gray-500 mt-2">
                <p>그 외 {exam.problemCount - 4}개 문제는 모의고사 시작 후 확인할 수 있습니다.</p>
              </div>
            </div>
          </>
        ) : isCompleted ? (
          /* 모의고사 결과 페이지 */
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">모의고사 결과</CardTitle>
                <CardDescription>
                  {exam.title} - {formatTime(3 * 60 * 60 - timeLeft)} 소요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* 결과 요약 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-blue-600 mb-1">객관식 정답률</p>
                      <p className="text-3xl font-bold text-blue-700">{calculateResults().accuracyRate}%</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-green-600 mb-1">제출한 문제</p>
                      <p className="text-3xl font-bold text-green-700">
                        {calculateResults().answeredProblems}/{calculateResults().totalProblems}
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-purple-600 mb-1">소요 시간</p>
                      <p className="text-3xl font-bold text-purple-700">{formatTime(3 * 60 * 60 - timeLeft)}</p>
                    </div>
                  </div>

                  {/* 문제 번호 표시 */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">문제별 결과</h3>
                    <div className="flex flex-wrap gap-2">
                      {allProblems.map((_, index) => {
                        const state = problemStates[index]
                        let bgColor = "bg-gray-100 text-gray-700" // 미제출

                        if (state?.submitted) {
                          if (state.isCorrect === true) {
                            bgColor = "bg-green-100 text-green-800" // 정답
                          } else if (state.isCorrect === false) {
                            bgColor = "bg-red-100 text-red-800" // 오답
                          } else {
                            bgColor = "bg-blue-100 text-blue-800" // 제출됨 (주관식/노코딩/코딩)
                          }
                        }

                        return (
                          <div
                            key={index}
                            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${bgColor}`}
                          >
                            {index + 1}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* 문제별 해설 */}
                  <div className="space-y-8">
                    <h3 className="text-xl font-semibold">문제 해설</h3>

                    {allProblems.map((problem, index) => {
                      const state = problemStates[index]

                      return (
                        <Card key={index} className="border-l-4 border-l-blue-500">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-lg">{index + 1}번 문제</span>
                                <Badge variant="outline">{problem.id}</Badge>
                                <Badge
                                  className={`${
                                    problem.type === "객관식"
                                      ? "bg-blue-100 text-blue-800"
                                      : problem.type === "주관식"
                                        ? "bg-purple-100 text-purple-800"
                                        : problem.type === "노코딩"
                                          ? "bg-orange-100 text-orange-800"
                                          : "bg-pink-100 text-pink-800"
                                  }`}
                                >
                                  {problem.type}
                                </Badge>
                              </div>

                              {state?.submitted && (
                                <div>
                                  {state.isCorrect === true && (
                                    <Badge className="bg-green-100 text-green-800">정답</Badge>
                                  )}
                                  {state.isCorrect === false && <Badge className="bg-red-100 text-red-800">오답</Badge>}
                                  {state.isCorrect === undefined && state.submitted && (
                                    <Badge className="bg-blue-100 text-blue-800">제출됨</Badge>
                                  )}
                                </div>
                              )}
                            </div>
                            <CardTitle>{problem.title}</CardTitle>
                            <CardDescription>{problem.area}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">문제</h4>
                              <p className="text-gray-700">{problem.question}</p>
                            </div>

                            {problem.type === "객관식" && problem.options && (
                              <div>
                                <h4 className="font-semibold mb-2">보기</h4>
                                <div className="space-y-2">
                                  {problem.options.map((option, optIndex) => (
                                    <div
                                      key={optIndex}
                                      className={`p-3 rounded-md ${
                                        problem.answer === option
                                          ? "bg-green-50 border border-green-200"
                                          : state?.userAnswer === option && problem.answer !== option
                                            ? "bg-red-50 border border-red-200"
                                            : "bg-gray-50"
                                      }`}
                                    >
                                      <div className="flex items-start">
                                        <div className="mr-2">{String.fromCharCode(65 + optIndex)}.</div>
                                        <div>{option}</div>
                                        {problem.answer === option && (
                                          <CheckCircle className="ml-auto h-5 w-5 text-green-600" />
                                        )}
                                        {state?.userAnswer === option && problem.answer !== option && (
                                          <XCircle className="ml-auto h-5 w-5 text-red-600" />
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {state?.submitted && (
                              <div>
                                <h4 className="font-semibold mb-2">제출한 답변</h4>
                                <div className="p-3 bg-gray-50 rounded-md">
                                  {problem.type === "객관식"
                                    ? state.userAnswer
                                    : state.userAnswer || <span className="text-gray-400">답변 없음</span>}
                                </div>
                              </div>
                            )}

                            <div>
                              <h4 className="font-semibold mb-2">해설</h4>
                              <div className="p-4 bg-blue-50 rounded-md text-blue-800">
                                {problem.type === "객관식" && problem.answer ? (
                                  <>
                                    <p className="font-medium mb-2">정답: {problem.answer}</p>
                                    <p>
                                      이 문제는 {problem.area} 영역의 이해도를 평가합니다.
                                      {problem.id === "AI-001" &&
                                        "멀티모달 LLM의 핵심 장점은 여러 모달리티를 동시에 처리할 수 있다는 점입니다. 통합된 프롬프트로 구성하되 명확한 작업 순서를 제시하면, 모델이 이미지와 텍스트 간의 관계를 더 잘 이해하고 일관성 있는 결과를 생성할 수 있습니다."}
                                      {problem.id === "AI-005" &&
                                        "멀티모달 데이터 처리에서는 각 모달리티의 고유한 특성을 보존하면서도 효과적으로 통합하는 것이 중요합니다. 어텐션 메커니즘을 사용하면 상황에 따라 중요한 모달리티에 더 높은 가중치를 부여할 수 있어 최적의 성능을 달성할 수 있습니다."}
                                      {!["AI-001", "AI-005"].includes(problem.id) &&
                                        "이 문제의 정답은 주어진 상황에서 가장 효과적인 접근 방식을 선택하는 것입니다. 각 옵션의 장단점을 비교하여 최적의 솔루션을 도출해야 합니다."}
                                    </p>
                                  </>
                                ) : (
                                  <p>
                                    {problem.id === "AI-002" &&
                                      "AI 편향성 완화는 체계적인 접근이 필요합니다. 1단계에서는 다양한 공정성 지표(Demographic Parity, Equal Opportunity 등)로 편향성을 측정하고, 2단계에서는 데이터 증강과 알고리즘 개선을 통해 편향성을 완화하며, 3단계에서는 지속적인 모니터링 체계를 구축해야 합니다."}
                                    {problem.id === "AI-003" &&
                                      "노코드 자동화는 API 연동과 트리거 설정이 핵심입니다. Google Analytics의 데이터를 정기적으로 추출하고, AI를 통해 인사이트를 생성한 후, 팀 커뮤니케이션 도구로 전달하는 전체 프로세스를 자동화할 수 있습니다."}
                                    {problem.id === "AI-004" &&
                                      "RAG 시스템은 문서 임베딩, 벡터 검색, 컨텍스트 기반 생성의 3단계로 구성됩니다. 각 단계에서 성능 최적화와 정확도 향상을 위한 기법들을 적용해야 합니다."}
                                    {!["AI-002", "AI-003", "AI-004"].includes(problem.id) &&
                                      "이 문제는 실무 상황에서의 AI 활용 능력을 평가합니다. 문제 해결을 위한 체계적인 접근 방식과 실행 가능한 솔루션을 제시하는 것이 중요합니다."}
                                  </p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pt-4">
                <div className="space-x-4">
                  <Link href="/problems">
                    <Button variant="outline">문제 목록으로</Button>
                  </Link>
                  <Link href={`/mock-exams/${exam.id}`}>
                    <Button className="bg-blue-600 hover:bg-blue-700">다시 풀기</Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        ) : (
          /* Mock Exam Started */
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{exam.title}</CardTitle>
                    <CardDescription className="mt-2">
                      진행 중인 모의고사 ({exam.problemCount}문제 중 {currentProblemIndex + 1}번째 문제)
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                    <Clock className="h-5 w-5" />
                    <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* 문제 번호 표시 */}
                <ProblemNumberIndicator />

                <div className="mb-6">
                  <Progress value={((currentProblemIndex + 1) / allProblems.length) * 100} className="h-2" />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>
                      진행률: {currentProblemIndex + 1}/{allProblems.length}
                    </span>
                    <span>남은 문제: {allProblems.length - (currentProblemIndex + 1)}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* 현재 문제 */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{currentProblem.id}</Badge>
                    <Badge
                      className={`${
                        currentProblem.type === "객관식"
                          ? "bg-blue-100 text-blue-800"
                          : currentProblem.type === "주관식"
                            ? "bg-purple-100 text-purple-800"
                            : currentProblem.type === "노코딩"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-pink-100 text-pink-800"
                      }`}
                    >
                      {currentProblem.type}
                    </Badge>
                    <Badge
                      className={`${
                        currentProblem.difficulty === "초급"
                          ? "bg-green-100 text-green-800"
                          : currentProblem.difficulty === "중급"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {currentProblem.difficulty}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{currentProblem.title}</h3>
                    <p className="text-gray-700 mb-2">
                      <strong>영역:</strong> {currentProblem.area}
                    </p>
                    <p className="text-lg leading-relaxed mb-6">{currentProblem.question}</p>

                    {/* 문제 유형에 따른 입력 폼 */}
                    {currentProblem.type === "객관식" && currentProblem.options && (
                      <div className="space-y-3 mt-8">
                        {currentProblem.options.map((option, index) => (
                          <div
                            key={index}
                            className={`flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 ${
                              selectedAnswer === option ? "border-blue-500 bg-blue-50" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              id={`option-${index}`}
                              name="answer"
                              value={option}
                              checked={selectedAnswer === option}
                              onChange={() => setSelectedAnswer(option)}
                              className="mt-1"
                              disabled={problemStates[currentProblemIndex]?.submitted}
                            />
                            <label
                              htmlFor={`option-${index}`}
                              className="flex-1 cursor-pointer text-base leading-relaxed"
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}

                    {(currentProblem.type === "주관식" ||
                      currentProblem.type === "노코딩" ||
                      currentProblem.type === "코딩") && (
                      <div className="mt-8">
                        <textarea
                          value={subjectiveAnswer}
                          onChange={(e) => setSubjectiveAnswer(e.target.value)}
                          placeholder="답변을 입력하세요..."
                          className="w-full min-h-[200px] p-4 border rounded-lg"
                          disabled={problemStates[currentProblemIndex]?.submitted}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-6">
                <Button variant="outline" onClick={goToPreviousProblem} disabled={currentProblemIndex === 0}>
                  이전 문제
                </Button>
                <div className="space-x-3">
                  {!problemStates[currentProblemIndex]?.submitted ? (
                    <Button
                      onClick={handleSubmitProblem}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={
                        (currentProblem.type === "객관식" && !selectedAnswer) ||
                        ((currentProblem.type === "주관식" ||
                          currentProblem.type === "노코딩" ||
                          currentProblem.type === "코딩") &&
                          !subjectiveAnswer.trim())
                      }
                    >
                      제출하기
                    </Button>
                  ) : currentProblemIndex < allProblems.length - 1 ? (
                    <Button onClick={goToNextProblem} className="bg-blue-600 hover:bg-blue-700">
                      다음 문제
                    </Button>
                  ) : (
                    <Button onClick={completeExam} className="bg-purple-600 hover:bg-purple-700">
                      모의고사 완료
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">모의고사 진행 중</h4>
                  <p className="text-blue-700 text-sm">
                    모든 문제를 풀고 제출하면 즉시 결과를 확인할 수 있습니다. 중간에 나가도 진행 상황은 저장됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
