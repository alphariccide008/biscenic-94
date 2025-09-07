"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              SHOP
            </Link>
            <Link
              href="/exhibition"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              EXHIBITION
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              ABOUT
            </Link>
          </div>

          {/* Center Logo - Responsive sizing */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/"
              className="text-lg lg:text-2xl tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.2em] font-medium sm:text-2xl italic"
              style={{ fontFamily: "cursive" }}
            >
              BISCENIC
            </Link>
          </div>

          {/* Right side - Cart and Contact */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                CONTACT
              </Link>
            </div>

            <Link href="/cart" className="relative p-2">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/shop"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                SHOP
              </Link>
              <Link
                href="/exhibition"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                EXHIBITION
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
