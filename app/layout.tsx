import type React from "react"
import type { Metadata, Viewport } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Arimo, Arimo as V0_Font_Arimo, Geist as V0_Font_Geist, Slabo_27px as V0_Font_Slabo_27px } from 'next/font/google'

// Initialize fonts
const _arimo = V0_Font_Arimo({ subsets: ['latin'], weight: ["400","500","600","700"] })
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _slabo_27px = V0_Font_Slabo_27px({ subsets: ['latin'], weight: ["400"] })

const arimo = Arimo({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Spendtrails - Take Control of Your Spending",
    template: "%s | Spendtrails",
  },
  description:
    "Spendtrails gives you clarity and confidence over your finances. Track spending, manage bills, and reach your savings goals—all in one simple app.",
  keywords: [
    "budgeting app",
    "expense tracker",
    "personal finance",
    "bill tracking",
    "savings goals",
    "money management",
  ],
  openGraph: {
    title: "Spendtrails - Take Control of Your Spending",
    description: "Track spending, manage bills, and reach your savings goals—all in one simple app.",
    type: "website",
    url: "https://www.spendtrails.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spendtrails - Take Control of Your Spending",
    description: "Track spending, manage bills, and reach your savings goals—all in one simple app.",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#025964",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${arimo.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
