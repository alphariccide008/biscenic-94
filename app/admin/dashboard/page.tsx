"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Package, ShoppingCart, BarChart, LogOut } from "lucide-react" // Import new icons

export default function AdminDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn")
    if (isLoggedIn !== "true") {
      router.push("/secure-admin")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    console.log("Admin logged out.")
    router.push("/admin/login")
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-12">
      <Card className="w-full max-w-4xl shadow-lg">
        {" "}
        {/* Added shadow */}
        <CardHeader className="space-y-2 text-center">
          {" "}
          {/* Adjusted spacing */}
          <CardTitle className="text-4xl font-extrabold tracking-tight text-gray-900">Admin Dashboard</CardTitle>{" "}
          {/* Larger, bolder title */}
          <CardDescription className="text-lg text-gray-600">
            Welcome, Administrator! Manage your store's content here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-10">
          {" "}
          {/* Increased spacing */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {" "}
            {/* Increased gap */}
            {/* Product Management */}
            <Card className="p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
              {" "}
              {/* Added hover effects */}
              <Package className="mx-auto h-12 w-12 text-indigo-600 mb-4" /> {/* Icon for Products */}
              <h3 className="text-xl font-semibold mb-2">Product Management</h3>
              <p className="text-gray-600 text-sm mb-4">Add, edit, or remove products from your catalog.</p>
              <Button className="w-full bg-black text-white hover:bg-gray-800" asChild>
                <Link href="/admin/products">Manage Products</Link>
              </Button>
            </Card>
            {/* Order Management */}
            <Card className="p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
              {" "}
              {/* Added hover effects */}
              <ShoppingCart className="mx-auto h-12 w-12 text-green-600 mb-4" /> {/* Icon for Orders */}
              <h3 className="text-xl font-semibold mb-2">Order Management</h3>
              <p className="text-gray-600 text-sm mb-4">View and process customer orders.</p>
              <Button className="w-full bg-black text-white hover:bg-gray-800" asChild>
                <Link href="/admin/orders">View Orders</Link>
              </Button>
            </Card>
            {/* Data Analytics */}
            <Card className="p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
              {" "}
              {/* Added hover effects */}
              <BarChart className="mx-auto h-12 w-12 text-blue-600 mb-4" /> {/* Icon for Analytics */}
              <h3 className="text-xl font-semibold mb-2">Data Analytics</h3>
              <p className="text-gray-600 text-sm mb-4">Monitor website performance and user interactions.</p>
              <Button className="w-full bg-black text-white hover:bg-gray-800" asChild>
                <Link href="/admin/analytics">View Analytics</Link>
              </Button>
            </Card>
          </div>
          <Separator className="my-8" /> {/* Added margin */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white bg-transparent flex items-center gap-2 px-6 py-3" // Added icon and padding
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
