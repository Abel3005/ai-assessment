"use client"
import { Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User } from "@/app/actions/auth"
import { LogoutButton } from "./logout-button"
import { useState } from "react"


export function Header({user}:{user:User|null}) {
    const [hoverNum, sethoverNum ] = useState(0);

    const router = useRouter()
  return (
  <header className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-5">
        <Link href="/" className="flex items-center space-x-2">
          <Target className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">AI Hub</h1>
        </Link>
        <div className="flex items-start space-x-6">
          <Link href="/about" className="text-xl font-bold hover:text-red-500 py-5" onMouseEnter={()=>{sethoverNum(1); console.log(hoverNum==1)}}>
            소개
          </Link>
          

          <Link href="/problems" className="text-xl font-bold hover:text-red-500 py-5" onMouseEnter={()=>{sethoverNum(2)}}>
            문제풀이
          </Link>
          {user && 
            <Link href="/dashboard" className="text-xl font-bold hover:text-red-500 py-5"onMouseEnter={()=>{sethoverNum(3)}}>
                대시보드
            </Link>
          }
        </div>
        <nav className="flex items-center space-x-8">
            {!user && <Button onClick={() => { router.push("/auth/login") } }>로그인</Button>}
            {user && 
            <div className="flex items-center space-x-3">
                <span className="text-gray-700">안녕하세요, {user.name}님</span>
                <LogoutButton />
            </div>
            }
        </nav>
      </div>
    </div>
  </header>
  )
}
