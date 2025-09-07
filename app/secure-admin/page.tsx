"use client"

import type React from "react"
import { useRouter } from "next/navigation" // Import useRouter

import { useState, useEffect } from "react" // Import useEffect
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox" // Import Checkbox

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false) // New state for remember me
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Check for saved login state on component mount
  useEffect(() => {
    const savedLogin = localStorage.getItem("adminLoggedIn")
    if (savedLogin === "true") {
      router.push("/admin/dashboard")
    }
  }, [router])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (email === "biscenic@gmail.com" && password === "123456789") {
      console.log("Login successful!")
      if (rememberMe) {
        localStorage.setItem("adminLoggedIn", "true") // Save login state
      } else {
        localStorage.removeItem("adminLoggedIn") // Clear if not remembered
      }
      router.push("/admin/dashboard")
    } else {
      setError("Invalid email or password.")
    }
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-wide">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the CMS dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="biscenic@gmail.com" // Updated placeholder
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="123456789" // Updated placeholder
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)} // Ensure boolean
              />
              <Label htmlFor="rememberMe">Remember me</Label>
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
