'use server'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Target, TrendingUp } from "lucide-react"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { getCurrentUser } from "./actions/auth"
import Image from "next/image"

export default async function HomePage() {
  let user = null
  try{
    user = await getCurrentUser();
  }
  catch(e){
    console.error("getcurrentUser failed",e )
  }
  const username = user?.user_metadata.username;
  
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      {<Header idx={0} username={username}/>}

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center items-center">
          <h1 className="text-5xl font-bold text-white mb-6">AI 활용 역량 평가</h1>
          <p className="text-2xl text-blue-200 mb-8 max-w-3xl mx-auto">
            AI 시대에 따라 바뀐 기업들의 채용 절차를 학습하고,<br />실제 출제될 법한 문제들을 통해 체계적으로
            준비하세요.
          </p>
          <div className="flex justify-center mb-12">
          <Image   src="test1.png" alt="" className="flex justify-center items-center mask-image-[radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)]" width={600} height={600}/>
          </div>
          <div className="flex justify-center space-x-4">
          </div>
        </div>
      </section>
      {/* Problem Types Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">문제 유형별 미리보기</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Badge className="w-fit bg-blue-100 text-blue-800">객관식</Badge>
                <CardTitle className="text-lg">프롬프트 최적화</CardTitle>
                <CardDescription>AI 모델과의 효과적인 상호작용 방법</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Badge className="w-fit bg-green-100 text-green-800">주관식</Badge>
                <CardTitle className="text-lg">윤리적 검토</CardTitle>
                <CardDescription>AI 활용 시 고려해야 할 윤리적 이슈</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Badge className="w-fit bg-purple-100 text-purple-800">노코딩</Badge>
                <CardTitle className="text-lg">자동화 워크플로우</CardTitle>
                <CardDescription>노코드 도구를 활용한 업무 자동화</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Badge className="w-fit bg-red-100 text-red-800">코딩</Badge>
                <CardTitle className="text-lg">API 활용</CardTitle>
                <CardDescription>AI API를 활용한 실제 구현</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">지금 바로 시작하세요</h2>
          <p className="text-xl text-blue-100 mb-8">AI 시대의 핵심 역량을 기르고 꿈의 직장에 한 걸음 더 가까워지세요</p>
          <Link href="/problems">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              문제 풀이 시작하기
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-6 w-6" />
                <span className="text-lg font-semibold">AI Assessment Hub</span>
              </div>
              <p className="text-gray-400">AI 활용 역량 평가 전문 플랫폼</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">서비스</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/problems" className="hover:text-white">
                    문제 풀이
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    기업 소개
                  </Link>
                </li>
                <li>
                  <Link href="/guide" className="hover:text-white">
                    학습 가이드
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">지원</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    도움말
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    문의하기
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Assessment Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


