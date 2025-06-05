"use server"

import { supabase } from "@/lib/supaBase"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// 간단한 사용자 데이터 타입
interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

// 임시 사용자 저장소 (실제로는 데이터베이스 사용)
const users: User[] = []

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const {data, error} = await supabase.auth.signUp({
    email,
    password
  })
  if(error){
    return {sucess: false, error: "가입 이메일을 확인해주세요."} 
  }
  if(data.user){
  const {error }= await supabase.from('profiles').insert({
    id: data.user.id, // auth.users의 UUID
    username: name,
    avatar_url:"",
    full_name: name,
    })
  }
  if(error){
    return {suceess: false, error:"데이터 추가 안됨."}
  }
  // 새 사용자 생성
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    createdAt: new Date().toISOString(),
  }

  // 세션 쿠키 설정
  const cookieStore = await cookies()
  cookieStore.set("user", JSON.stringify(newUser), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7일
  })

  return { success: true }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // 사용자 찾기 (실제로는 비밀번호 해시 비교)
  const {error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if(error){
    return {sucess: false, error: "이메일 또는 비밀번호가 올바르지 않습니다."}
  }

  const {data: {user},} = await supabase.auth.getUser()

  // 세션 쿠키 설정
  const cookieStore = await cookies()
  cookieStore.set("user", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7일
  })

  return { success: true }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete("user");
  await supabase.auth.signOut();
  redirect("/")
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get("user")

  if (!userCookie) {
    return null
  }

  try {
    return JSON.parse(userCookie.value)
  } catch {
    return null
  }
}
