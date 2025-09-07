"use client"
import Image from "next/image"
import { DialogDescription } from "@/components/ui/dialog"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, PlusCircle, ImageIcon } from "lucide-react" // Import ImageIcon
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Re-declaring the products array from app/shop/page.tsx for direct use here
const productsFromShop = [
  {
    id: 1,
    name: "City Bag Small",
    price: "$2,150",
    image: "/placeholder.svg?height=400&width=300", // Updated dummy image with query
    category: "bags",
  },
  {
    id: 2,
    name: "Triple S Sneaker",
    price: "$1,050",
    image: "/placeholder.svg?height=400&width=300", // Updated dummy image with query
    category: "shoes",
  },
  {
    id: 3,
    name: "Oversized Blazer",
    price: "$2,890",
    image: "/placeholder.svg?height=400&width=300", // Updated dummy image with query
    category: "clothing",
  },
  {
    id: 4,
    name: "Le Cagole Bag",
    price: "$2,550",
    image: "/placeholder.svg?height=400&width=300", // Updated dummy image with query
    category: "bags",
  },
  {
    id: 5,
    name: "Track Sneaker",
    price: "$895",
    image: "/placeholder.svg?height=400&width=300", // Updated dummy image with query
    category: "shoes",
  },
  {
    id: 6,
    name: "Hourglass Coat",
    price: "$3,200",
    image: "/placeholder.svg?height=400&width=300", // Updated dummy image with query
    category: "clothing",
  },
]

// Map the shop products to the admin product structure, adding a dummy stock
const initialAdminProducts = productsFromShop.map((product, index) => ({
  id: String(product.id), // Ensure ID is string for consistency
  name: product.name,
  category: product.category,
  price: Number.parseFloat(product.price.replace("$", "").replace(",", "")), // Convert price string to number
  stock: 10 + index * 2, // Dummy stock value
  image: product.image,
}))

export default function AdminProductsPage() {
  const [products, setProducts] = useState(initialAdminProducts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<(typeof initialAdminProducts)[0] | null>(null)

  const handleEdit = (productId: string) => {
    const productToEdit = products.find((p) => p.id === productId)
    if (productToEdit) {
      setEditingProduct({ ...productToEdit }) // Create a copy to edit
      setIsModalOpen(true)
    }
  }

  const handleDelete = (productId: string) => {
    if (confirm(`Are you sure you want to delete product ${productId}?`)) {
      setProducts(products.filter((product) => product.id !== productId))
      console.log(`Deleted product: ${productId}`)
      // In a real application, you would also make an API call here to delete from the backend
    }
  }

  const handleAddProduct = () => {
    setEditingProduct({
      id: String(products.length + 1), // Simple dummy ID for new product
      name: "",
      category: "",
      price: 0,
      stock: 0,
      image: "/placeholder.svg?height=400&width=300", // Default image for new product
    })
    setIsModalOpen(true)
  }

  const handleSaveProduct = () => {
    if (!editingProduct) return

    setProducts((prevProducts) => {
      const existingIndex = prevProducts.findIndex((p) => p.id === editingProduct.id)
      if (existingIndex > -1) {
        // Update existing product
        const updatedProducts = [...prevProducts]
        updatedProducts[existingIndex] = editingProduct
        return updatedProducts
      } else {
        // Add new product
        return [...prevProducts, { ...editingProduct, id: String(Date.now()) }] // Ensure unique ID for new products
      }
    })
    setIsModalOpen(false)
    setEditingProduct(null)
    // In a real application, you would make an API call here to save/update to the backend
  }

  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditingProduct((prev) => {
      if (!prev) return null
      return {
        ...prev,
        [name]: name === "price" || name === "stock" ? Number(value) : value,
      }
    })
  }

  const getStockColor = (stock: number) => {
    if (stock < 5) return "text-red-500 font-semibold"
    if (stock < 15) return "text-orange-500"
    return "text-green-600"
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-12">
      <Card className="w-full max-w-6xl shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          {" "}
          {/* Adjusted padding */}
          <div>
            <CardTitle className="text-2xl font-bold tracking-wide">Product Management</CardTitle>
            <CardDescription>Manage your store's product catalog.</CardDescription>
          </div>
          <Button className="bg-black text-white hover:bg-gray-800 flex items-center gap-2" onClick={handleAddProduct}>
            <PlusCircle className="h-4 w-4" /> Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            {" "}
            {/* Added border and rounded corners */}
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>
                      <Image
                        src={product.image || "/placeholder.svg?height=100&width=75&query=product thumbnail fallback"}
                        alt={product.name}
                        width={60}
                        height={80}
                        className="rounded-md object-cover border" // Added border to image
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                    <TableCell className={`text-right ${getStockColor(product.stock)}`}>{product.stock}</TableCell>{" "}
                    {/* Color-coded stock */}
                    <TableCell className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(product.id)}
                        className="hover:bg-blue-100"
                      >
                        {" "}
                        {/* Hover effect */}
                        <Pencil className="h-4 w-4 text-blue-600" /> {/* Color icon */}
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                        className="hover:bg-red-100"
                      >
                        {" "}
                        {/* Hover effect */}
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {products.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No products found. Add a new product to get started!</p>
          )}
        </CardContent>
      </Card>

      {/* Edit/Add Product Modal */}
      {editingProduct && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingProduct.name ? "Edit Product" : "Add New Product"}</DialogTitle>
              <DialogDescription>
                {editingProduct.name ? "Make changes to this product here." : "Add a new product to your catalog."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={editingProduct.name}
                  onChange={handleModalChange}
                  className="col-span-3 border-gray-300 focus:border-black" // Refined input style
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  name="category"
                  value={editingProduct.category}
                  onChange={handleModalChange}
                  className="col-span-3 border-gray-300 focus:border-black" // Refined input style
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={editingProduct.price}
                  onChange={handleModalChange}
                  className="col-span-3 border-gray-300 focus:border-black" // Refined input style
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  Stock
                </Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={editingProduct.stock}
                  onChange={handleModalChange}
                  className="col-span-3 border-gray-300 focus:border-black" // Refined input style
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image URL
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Input
                    id="image"
                    name="image"
                    value={editingProduct.image}
                    onChange={handleModalChange}
                    className="flex-1 border-gray-300 focus:border-black" // Refined input style
                  />
                  <ImageIcon className="h-5 w-5 text-gray-500" /> {/* Image icon next to URL field */}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSaveProduct} className="bg-black text-white hover:bg-gray-800">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
