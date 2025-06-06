import { Brain, BookOpen, Code, Zap, Target, TrendingUp } from "lucide-react"

export interface MockExam {
  id: string
  title: string
  description: string
  difficulty: "초급" | "중급" | "고급" | "종합"
  timeLimit: string
  problemCount: number
  participants: number
  icon: any
  tags: string[]
  problemIds: string[]
  createdAt: string
  company?: string
}

export const mockExams: MockExam[] = [
  {
    id: "MOCK-001",
    title: "AI 활용 역량 종합 모의고사 1회",
    description: "프롬프트 작성, 윤리적 검토, 데이터 분석 등 AI 활용 역량을 종합적으로 평가하는 모의고사입니다.",
    difficulty: "종합",
    timeLimit: "3시간",
    problemCount: 20,
    participants: 1245,
    icon: Target,
    tags: ["프롬프트 엔지니어링", "윤리적 AI", "데이터 분석", "모델 선택"],
    problemIds: [
      "AI-001",
      "AI-002",
      "AI-005",
      "AI-006",
      "AI-007",
      // 나머지 15개 문제 ID는 실제 구현 시 추가
    ],
    createdAt: "2024-01-15",
  },
  {
    id: "MOCK-002",
    title: "프롬프트 엔지니어링 집중 모의고사",
    description: "다양한 상황에서의 프롬프트 작성 및 최적화 능력을 집중적으로 평가합니다.",
    difficulty: "중급",
    timeLimit: "2시간 30분",
    problemCount: 20,
    participants: 876,
    icon: Brain,
    tags: ["프롬프트 엔지니어링", "멀티모달 AI", "프롬프트 최적화", "제로샷 학습"],
    problemIds: [
      "AI-001",
      "AI-007",
      // 나머지 18개 문제 ID는 실제 구현 시 추가
    ],
    createdAt: "2024-01-28",
  },
  {
    id: "MOCK-003",
    title: "AI 윤리 및 검증 모의고사",
    description: "AI 시스템의 윤리적 측면과 결과 검증에 중점을 둔 문제들로 구성된 모의고사입니다.",
    difficulty: "고급",
    timeLimit: "3시간",
    problemCount: 20,
    participants: 542,
    icon: BookOpen,
    tags: ["AI 윤리", "편향성 검증", "투명성", "책임있는 AI"],
    problemIds: [
      "AI-002",
      // 나머지 19개 문제 ID는 실제 구현 시 추가
    ],
    createdAt: "2024-02-10",
  },
  {
    id: "MOCK-004",
    title: "노코딩 AI 자동화 모의고사",
    description: "코딩 없이 AI 도구와 자동화 플랫폼을 활용하는 능력을 평가합니다.",
    difficulty: "초급",
    timeLimit: "2시간",
    problemCount: 20,
    participants: 1532,
    icon: Zap,
    tags: ["노코딩", "자동화", "워크플로우", "AI 통합"],
    problemIds: [
      "AI-003",
      // 나머지 19개 문제 ID는 실제 구현 시 추가
    ],
    createdAt: "2024-02-25",
  },
  {
    id: "MOCK-005",
    title: "AI 개발자 코딩 모의고사",
    description: "AI API 활용, 모델 파인튜닝, 데이터 전처리 등 AI 개발 역량을 평가합니다.",
    difficulty: "고급",
    timeLimit: "4시간",
    problemCount: 20,
    participants: 387,
    icon: Code,
    tags: ["코딩", "API 통합", "파인튜닝", "RAG 시스템"],
    problemIds: [
      "AI-004",
      // 나머지 19개 문제 ID는 실제 구현 시 추가
    ],
    createdAt: "2024-03-05",
  },
  {
    id: "MOCK-006",
    title: "네이버 AI 직무 모의고사",
    description: "네이버의 AI 관련 직무 채용 과정에서 출제될 수 있는 문제 유형으로 구성되었습니다.",
    difficulty: "중급",
    timeLimit: "3시간",
    problemCount: 20,
    participants: 2134,
    icon: TrendingUp,
    tags: ["기업 채용", "네이버", "하이퍼클로바", "검색 AI"],
    problemIds: [
      "AI-001",
      "AI-002",
      "AI-004",
      "AI-005",
      // 나머지 16개 문제 ID는 실제 구현 시 추가
    ],
    createdAt: "2024-03-15",
    company: "네이버",
  },
  {
    id: "MOCK-007",
    title: "카카오 AI 직무 모의고사",
    description: "카카오의 AI 관련 직무 채용 과정에서 출제될 수 있는 문제 유형으로 구성되었습니다.",
    difficulty: "고급",
    timeLimit: "3시간 30분",
    problemCount: 20,
    participants: 1876,
    icon: TrendingUp,
    tags: ["기업 채용", "카카오", "멀티모달 AI", "생성형 AI"],
    problemIds: [
      "AI-001",
      "AI-003",
      "AI-006",
      "AI-007",
      // 나머지 16개 문제 ID는 실제 구현 시 추가
    ],
    createdAt: "2024-03-22",
    company: "카카오",
  },
]
