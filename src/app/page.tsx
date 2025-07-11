'use client'

import DragAndDropIndex from "@/components/drag-and-drop"
import { CartProvider } from "@/context/CartContext"
export default function Home() {
  return (
    <CartProvider>
      <main className="min-h-screen">
        <DragAndDropIndex />
      </main>
    </CartProvider>
  )
}