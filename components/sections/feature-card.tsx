"use client"

import { PiggyBank, CreditCard, TrendingUp, Bell, Wallet, BarChart3 } from "lucide-react"

const iconMap = {
  PiggyBank,
  CreditCard,
  TrendingUp,
  Bell,
  Wallet,
  BarChart3,
}

interface FeatureCardProps {
  iconName: string
  title: string
  description: string
  variant?: "default" | "large"
}

export function FeatureCard({ iconName, title, description, variant = "default" }: FeatureCardProps) {
  const Icon = iconMap[iconName as keyof typeof iconMap]
  
  if (!Icon) {
    console.warn(`Icon "${iconName}" not found in iconMap`)
    return null
  }
  if (variant === "large") {
    return (
      <div className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-7 w-7 text-primary transition-colors" />
        </div>
        <h3 className="mt-6 text-xl font-semibold text-card-foreground">{title}</h3>
        <p className="mt-3 text-muted-foreground leading-relaxed">{description}</p>
      </div>
    )
  }

  return (
    <div className="flex gap-4 group">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
