"use server"

import { supabase } from "@/lib/supaBase"
import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/supaBase";
import { redirect } from "next/navigation"

// 간단한 사용자 데이터 타입
export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export async function registerUser(formData: FormData) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const {data: authData, error :signupErr} = await supabase.auth.signUp({
    email,
    password,
    options:{
      data: {full_name : name, username: name},
    }
  })
  if(signupErr){
    return {sucess: false, error: signupErr.message} 
  }
  if(authData.user){

    const { error:profileErr }= await supabase.from('profiles').insert({
      id: authData.user.id, // auth.users의 UUID
      username: name,
      avatar_url:"",
      full_name: name,
       })
    if(profileErr){
      return {suceess: false, error:profileErr.message}
    }
  }
  return { success: true }
}

export async function loginUser(formData: FormData) {
  const supabase = createRouteHandlerClient<Database>({cookies});
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const {error: loginError} = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if(loginError){
    return {sucess: false, error: loginError.message}
  }
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
