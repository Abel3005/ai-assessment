"use server"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Building2, BookOpen, ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Header } from "@/components/header"
import { getCurrentUser } from "../actions/auth"

export default async function AboutPage() {
  const user = await getCurrentUser()
  const username = user?.user_metadata.username;

  return (
    <div className="min-h-screen bg-white">
      {<Header idx={1} user={username}/>}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI 활용 역량 평가 소개</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI 시대의 핵심 역량을 평가하는 기업들의 채용 절차를 학습하고, 실제 출제될 법한 문제들을 통해 체계적으로
            준비하세요. 최신 AI 트렌드를 반영한 다양한 문제 유형으로 실전 감각을 기르고, 성공적인 취업을 위한 경쟁력을
            확보할 수 있습니다.
          </p>
        </div>

        {/* AI 활용 역량 평가란? */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">AI 활용 역량 평가란?</h2>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <span>정의 및 중요성</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                AI 활용 역량 평가는 구직자가 인공지능 기술을 업무에 효과적으로 활용할 수 있는 능력을 측정하는 채용
                과정입니다. 단순한 기술적 지식을 넘어서 AI 도구를 실무에 적용하고, 윤리적 고려사항을 판단하며, 비즈니스
                문제를 AI로 해결할 수 있는 종합적 역량을 평가합니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                현재 AI 기술의 급속한 발전으로 모든 산업 분야에서 AI 활용 능력이 필수 역량으로 자리잡고 있으며, 기업들은
                이러한 역량을 갖춘 인재를 선별하기 위해 다양한 평가 방식을 도입하고 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>최근 채용 트렌드에서 AI 역량 평가의 비중</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">증가하는 중요성</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• IT 기업의 85% 이상이 AI 역량을 필수 평가 항목으로 포함</li>
                    <li>• 비IT 기업도 60% 이상이 AI 활용 능력을 우대 조건으로 설정</li>
                    <li>• 신입사원 채용에서 AI 관련 문제 출제 비율 300% 증가</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">평가 영역 확대</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 프롬프트 엔지니어링 및 AI 도구 활용</li>
                    <li>• 데이터 분석 및 AI 모델 검증</li>
                    <li>• AI 윤리 및 책임감 있는 AI 사용</li>
                    <li>• 노코드/로우코드 AI 플랫폼 활용</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 대표 기업 사례 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">대표 기업 사례</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">네이버 (NAVER)</CardTitle>
                  <Badge className="bg-green-100 text-green-800">대기업</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">평가 방식</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• 객관식: AI 기초 이론 및 최신 트렌드</li>
                      <li>• 서술형: 하이퍼클로바X 활용 시나리오 설계</li>
                      <li>• 실습: 네이버 클라우드 AI API 활용</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">사용 AI 기술</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• 하이퍼클로바X (LLM)</li>
                      <li>• 네이버 클라우드 AI 서비스</li>
                      <li>• 검색 및 추천 AI</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">채용 절차</h4>
                  <p className="text-gray-700">서류전형 → AI 역량 평가 (온라인) → 기술면접 → 임원면접</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">카카오 (Kakao)</CardTitle>
                  <Badge className="bg-yellow-100 text-yellow-800">대기업</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">평가 방식</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• 객관식: 멀티모달 AI 및 생성형 AI</li>
                      <li>• 서술형: AI 서비스 기획 및 윤리적 고려사항</li>
                      <li>• 노코딩: 카카오워크 자동화 구성</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">사용 AI 기술</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• 카카오브레인 AI 모델</li>
                      <li>• 대화형 AI (카카오톡 챗봇)</li>
                      <li>• 이미지/음성 인식 AI</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">채용 절차</h4>
                  <p className="text-gray-700">서류전형 → 코딩테스트 + AI 평가 → 1차 면접 → 2차 면접</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">삼성전자 (Samsung Electronics)</CardTitle>
                  <Badge className="bg-blue-100 text-blue-800">대기업</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">평가 방식</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• 객관식: AI 반도체 및 엣지 AI</li>
                      <li>• 서술형: IoT 환경에서의 AI 활용 방안</li>
                      <li>• 코딩: TensorFlow/PyTorch 모델 최적화</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">사용 AI 기술</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• 삼성 AI 플랫폼 (Bixby)</li>
                      <li>• 엣지 AI 및 NPU</li>
                      <li>• 스마트 디바이스 AI</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">채용 절차</h4>
                  <p className="text-gray-700">GSAT → AI 역량 평가 → 창의성 면접 → 임원면접</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">LG AI연구원</CardTitle>
                  <Badge className="bg-purple-100 text-purple-800">연구기관</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">평가 방식</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• 객관식: 최신 AI 논문 및 연구 동향</li>
                      <li>• 서술형: AI 연구 제안서 작성</li>
                      <li>• 코딩: 대규모 언어모델 파인튜닝</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">사용 AI 기술</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• EXAONE (초거대 AI)</li>
                      <li>• 멀티모달 AI 연구</li>
                      <li>• 로봇 AI 및 자율주행</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">채용 절차</h4>
                  <p className="text-gray-700">서류전형 → AI 전문성 평가 → 연구 발표 → 최종 면접</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">업스테이지 (Upstage)</CardTitle>
                  <Badge className="bg-red-100 text-red-800">AI 스타트업</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">평가 방식</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• 객관식: LLM 및 RAG 시스템</li>
                      <li>• 서술형: AI 제품 기획 및 사업화 전략</li>
                      <li>• 실습: Solar LLM API 활용 개발</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">사용 AI 기술</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Solar LLM</li>
                      <li>• Document AI</li>
                      <li>• OCR 및 문서 처리 AI</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">채용 절차</h4>
                  <p className="text-gray-700">서류전형 → 기술 과제 → 기술 면접 → 컬처 핏 면접</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 평가 준비 가이드 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">평가 준비 가이드</h2>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>구직자가 알아야 할 필수 개념</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">핵심 기술 개념</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      <strong>프롬프트 엔지니어링:</strong> 효과적인 AI 상호작용을 위한 질문 설계 기법
                    </li>
                    <li>
                      <strong>데이터 전처리:</strong> AI 모델 학습을 위한 데이터 정제 및 변환
                    </li>
                    <li>
                      <strong>모델 검증:</strong> AI 모델의 성능 평가 및 신뢰성 확보 방법
                    </li>
                    <li>
                      <strong>파인튜닝:</strong> 사전 훈련된 모델을 특정 작업에 맞게 조정
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">실무 활용 능력</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      <strong>API 활용:</strong> OpenAI, Claude 등 AI API 통합 및 활용
                    </li>
                    <li>
                      <strong>노코드 자동화:</strong> Zapier, Make 등을 활용한 워크플로우 구성
                    </li>
                    <li>
                      <strong>윤리적 고려:</strong> AI 편향성, 개인정보 보호, 투명성 확보
                    </li>
                    <li>
                      <strong>비즈니스 적용:</strong> AI를 활용한 실제 문제 해결 방안 설계
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ExternalLink className="h-5 w-5" />
                <span>학습 리소스</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">공식 문서 및 가이드</h4>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="https://platform.openai.com/docs"
                        className="text-blue-600 hover:underline flex items-center space-x-1"
                      >
                        <span>OpenAI API 공식 문서</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://docs.anthropic.com"
                        className="text-blue-600 hover:underline flex items-center space-x-1"
                      >
                        <span>Anthropic Claude 문서</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://huggingface.co/docs"
                        className="text-blue-600 hover:underline flex items-center space-x-1"
                      >
                        <span>Hugging Face 가이드</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.tensorflow.org/tutorials"
                        className="text-blue-600 hover:underline flex items-center space-x-1"
                      >
                        <span>TensorFlow 튜토리얼</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">학습 플랫폼 및 커뮤니티</h4>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="https://www.coursera.org/specializations/machine-learning-introduction"
                        className="text-blue-600 hover:underline flex items-center space-x-1"
                      >
                        <span>Coursera AI/ML 강의</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.kaggle.com/learn"
                        className="text-blue-600 hover:underline flex items-center space-x-1"
                      >
                        <span>Kaggle Learn</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/microsoft/AI-For-Beginners"
                        className="text-blue-600 hover:underline flex items-center space-x-1"
                      >
                        <span>Microsoft AI for Beginners</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.promptingguide.ai"
                        className="text-blue-600 hover:underline flex items-center space-x-1"
                      >
                        <span>Prompt Engineering Guide</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 서비스 이용 방법 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">서비스 이용 방법</h2>

          <Card>
            <CardHeader>
              <CardTitle>웹 플랫폼에서 문제 풀이 흐름</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">회원가입 및 로그인</h4>
                    <p className="text-gray-700">
                      이메일 또는 소셜 로그인을 통해 계정을 생성하고 개인 학습 진도를 관리하세요.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">문제 선택 및 풀이</h4>
                    <p className="text-gray-700">
                      난이도별, 유형별로 분류된 문제 중에서 선택하여 풀이를 시작합니다. 각 문제는 실제 기업 출제 경향을
                      반영하여 구성되었습니다.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">정답 확인 및 해설 보기</h4>
                    <p className="text-gray-700">
                      문제 제출 후 즉시 정답을 확인하고, 상세한 해설과 함께 추가 학습 자료를 제공받을 수 있습니다.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">학습 진도 관리</h4>
                    <p className="text-gray-700">
                      개인 대시보드에서 풀이한 문제, 정답률, 취약 영역 등을 확인하고 체계적으로 학습을 관리하세요.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="text-center bg-blue-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">지금 바로 시작하세요!</h3>
          <p className="text-gray-600 mb-6">AI 시대의 핵심 역량을 기르고 꿈의 직장에 한 걸음 더 가까워지세요</p>
          <Link href="/problems">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              문제 풀이 시작하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
