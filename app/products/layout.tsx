import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products | Arabesque Gallery",
  description: "Browse our collection of exquisite arabesque designs for your home.",
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 