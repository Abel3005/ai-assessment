"use server"

import { getCurrentUser } from "./auth"

export interface ProblemResult {
  problemId: string
  correct: boolean
  timeSpent: number
  submittedAt: string
  userAnswer: string
}

export interface UserProgress {
  userId: string
  results: ProblemResult[]
  totalTime: number
  lastActivity: string
}

// 임시 진도 저장소 (실제로는 데이터베이스 사용)
const progressData: UserProgress[] = []

export async function saveProblemResult(result: Omit<ProblemResult, "submittedAt">) {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("로그인이 필요합니다.")
  }

  const problemResult: ProblemResult = {
    ...result,
    submittedAt: new Date().toISOString(),
  }

  let userProgress = progressData.find((p) => p.userId === user.id)

  if (!userProgress) {
    userProgress = {
      userId: user.id,
      results: [],
      totalTime: 0,
      lastActivity: new Date().toISOString(),
    }
    progressData.push(userProgress)
  }

  // 기존 결과가 있다면 업데이트, 없다면 추가
  const existingIndex = userProgress.results.findIndex((r) => r.problemId === result.problemId)
  if (existingIndex >= 0) {
    userProgress.results[existingIndex] = problemResult
  } else {
    userProgress.results.push(problemResult)
  }

  userProgress.totalTime += result.timeSpent
  userProgress.lastActivity = new Date().toISOString()

  return { success: true }
}

export async function getUserProgress(): Promise<UserProgress | null> {
  const user = await getCurrentUser()
  if (!user) {
    return null
  }

  return progressData.find((p) => p.userId === user.id) || null
}
