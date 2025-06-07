"use server"

import { supabase } from "@/lib/supaBase"
import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/supaBase";
import { redirect } from "next/navigation"


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
  const supabase = createRouteHandlerClient<Database>({cookies});
  await supabase.auth.signOut();
  redirect("/")
}

export async function getCurrentUser(){
  const supabase = createRouteHandlerClient<Database>({cookies});
  const{ data: {session}} = await supabase.auth.getSession();
  return session?.user ?? null;
}
