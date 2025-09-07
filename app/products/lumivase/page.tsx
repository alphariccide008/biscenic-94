"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import { ImagePreviewModal } from "@/components/image-preview-modal"

const product = {
  id: "lumivase",
  name: "LumiVase",
  price: "$2,850",
  description:
    "A tree locked in time, yet never static. Its silence hums with memory. Its roots hold the weight of becoming. Light pulses beneath it not to illuminate, but to remind you that presence has a pulse. It is discipline sculpted into form. The refusal to rush. The architecture of patience. It does not perform beauty, it contains it. This is not an object. It is a consciousness, quiet, deliberate and eternal.",
  images: [
    "/images/lumivase-bonsai.png",
    "/images/living-room-bonsai.png",
    "/images/exhibition-bonsai-chair.png",
    "/images/living-room-bonsai-sofa.png",
    "/images/bonsai-chair.png",
    "/images/bedroom-bonsai-dark.png",
    "/images/bedroom-bonsai-light.jpeg",
    "/images/bonsai-in-case.jpeg",
  ],
  video: "/videos/lumivase-hero-new.mov",
  inStock: true,
  category: "Lighting",
}

export default function LumiVasePage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
    })
  }

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Media */}
          <div className="space-y-4">
            {/* Main media display */}
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              {selectedImageIndex === 0 && product.video ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => openModal(0)}
                >
                  <source src={product.video} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={product.images[selectedImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => openModal(selectedImageIndex)}
                />
              )}
            </div>

            {/* Thumbnail grid */}
            <div className="grid grid-cols-4 gap-2">
              {/* Video thumbnail */}
              {product.video && (
                <div
                  className={`aspect-square relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 ${
                    selectedImageIndex === 0 ? "border-black" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImageIndex(0)}
                >
                  <video muted playsInline className="w-full h-full object-cover">
                    <source src={product.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[6px] border-l-black border-y-[4px] border-y-transparent ml-0.5"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Image thumbnails */}
              {product.images.slice(0, 3).map((image, index) => {
                const actualIndex = index + 1 // Offset by 1 because video is at index 0
                return (
                  <div
                    key={index}
                    className={`aspect-square relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 ${
                      selectedImageIndex === actualIndex ? "border-black" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImageIndex(actualIndex)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right side - Product details */}
          <div className="flex flex-col justify-start lg:pl-8">
            <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wider">{product.name}</h1>
            <p className="text-3xl font-medium mb-6">{product.price}</p>
            <p className="text-gray-700 mb-8 leading-relaxed text-sm md:text-base">{product.description}</p>

            <div className="flex items-center space-x-4 mb-8">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white hover:bg-gray-800 py-3 text-sm tracking-wider"
              >
                ADD TO CART
              </Button>

              <div className="flex items-center border border-gray-300 rounded">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-100">
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-100">
                  +
                </button>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-2">
                <Badge variant={product.inStock ? "default" : "secondary"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
                <Badge variant="outline">{product.category}</Badge>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium mb-4">Product Details</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Handcrafted with premium materials</li>
                <li>• Integrated LED lighting system</li>
                <li>• Sustainable and eco-friendly design</li>
                <li>• Includes care instructions</li>
                <li>• 2-year warranty included</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ImagePreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={product.images}
        currentIndex={selectedImageIndex}
        onIndexChange={setSelectedImageIndex}
        productName={product.name}
        hasVideo={!!product.video}
        videoUrl={product.video}
      />
    </div>
  )
}
