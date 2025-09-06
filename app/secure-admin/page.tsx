"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SecureAdminPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Default admin credentials
  const ADMIN_EMAIL = "admin@biscenic.com"
  const ADMIN_PASSWORD = "admin123"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simple authentication check
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Store admin session (in a real app, use proper authentication)
        if (typeof window !== "undefined") {
          localStorage.setItem("adminLoggedIn", "true")
          localStorage.setItem("adminEmail", email)
        }

        // Redirect to admin dashboard
        router.push("/admin/dashboard")
      } else {
        setError("Invalid email or password. Please use the demo credentials shown below.")
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.")
      console.error("Login error:", err)
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the admin dashboard.</CardDescription>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
            <p className="font-semibold mb-2">Demo Credentials:</p>
            <p className="font-mono">Email: admin@biscenic.com</p>
            <p className="font-mono">Password: admin123</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@biscenic.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm text-center">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <Link className="underline" href="/">
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
