"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifyPassword } from "@/lib/admin"

export async function login(formData: FormData) {
  const password = formData.get("password") as string
  if (!verifyPassword(password)) {
    redirect("/admin/login?error=Password%20salah")
  }
  const cookieStore = await cookies()
  cookieStore.set("admin_session", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/admin",
  })
  redirect("/admin")
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
  redirect("/admin/login")
}
