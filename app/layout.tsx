import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { cn } from "@/lib/utils"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Arabesque Gallery - Exquisite Islamic Art & Design",
  description: "Discover our collection of handcrafted arabesque art, featuring traditional Islamic geometric patterns and designs.",
  keywords: [
    "arabesque",
    "Islamic art",
    "geometric patterns",
    "traditional design",
    "handcrafted",
    "luxury decor",
    "wall panels",
    "door panels",
    "room dividers",
    "custom designs"
  ],
  authors: [{ name: "Arabesque Gallery" }],
  creator: "Arabesque Gallery",
  publisher: "Arabesque Gallery",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          html {
            zoom: 0.9;
            -moz-transform: scale(0.9);
            -moz-transform-origin: 0 0;
          }
        `}</style>
      </head>
      <body className={cn(
        "min-h-screen font-sans antialiased",
        inter.className
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="arabesque-theme"
        >
          <div className="fixed inset-0 bg-gradient-to-b from-black to-gray-900 -z-10" />
          {children}
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: '#1f2937',
                color: '#fff',
                border: '1px solid #374151',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'