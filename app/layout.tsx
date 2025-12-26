import type React from "react"
import type { Metadata, Viewport } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// Using system fonts with Helvetica as primary

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
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
