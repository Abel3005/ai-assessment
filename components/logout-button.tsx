"use client"

import { Button } from "@/components/ui/button"
import { logoutUser } from "@/app/actions/auth"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  return (
    <form action={logoutUser}>
      <Button variant="outline" size="sm" type="submit">
        <LogOut className="h-4 w-4 mr-2" />
        로그아웃
      </Button>
    </form>
  )
}
