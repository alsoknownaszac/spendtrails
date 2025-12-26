"use client"

import { useEffect, useRef, useState } from "react"

interface PhoneMockupProps {
  className?: string
  animate?: boolean
}

export function PhoneMockup({ className = "", animate = true }: PhoneMockupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`relative ${animate ? (isVisible ? "animate-scale-in" : "opacity-0") : ""} ${className}`}>
      {/* Phone frame - iPhone style */}
      <div className={`relative mx-auto w-[280px] sm:w-[320px] ${animate && isVisible ? "animate-float" : ""}`}>
        {/* Outer frame */}
        <div className="relative rounded-[3rem] bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 p-3 shadow-2xl">
          {/* Inner frame with notch */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-black">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-3 left-1/2 z-20 h-7 w-24 -translate-x-1/2 rounded-full bg-black" />

            {/* Screen */}
            <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.5rem] bg-background">
              {/* Status bar */}
              <div className="flex items-center justify-between px-8 pt-4 text-[10px] font-medium text-foreground">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z" />
                  </svg>
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 22h20V2z" />
                  </svg>
                  <div className="flex h-2.5 w-6 items-center rounded-sm border border-current px-0.5">
                    <div className="h-1.5 w-4 rounded-[1px] bg-current" />
                  </div>
                </div>
              </div>

              {/* App content */}
              <div className="px-4 pt-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Good morning</p>
                    <p className="text-sm font-semibold text-foreground">Welcome back</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-primary/10" />
                </div>

                {/* Balance card */}
                <div className="mt-4 rounded-2xl bg-primary p-4 text-primary-foreground">
                  <p className="text-[10px] opacity-80">Total Balance</p>
                  <p className="mt-1 text-2xl font-bold">$12,458.32</p>
                  <div className="mt-3 flex items-center gap-1 text-[10px]">
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-accent">+2.4%</span>
                    <span className="opacity-80">this month</span>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {["Budget", "Bills", "Goals", "Reports"].map((action) => (
                    <div key={action} className="flex flex-col items-center gap-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                        <div className="h-4 w-4 rounded-md bg-primary/30" />
                      </div>
                      <span className="text-[8px] text-muted-foreground">{action}</span>
                    </div>
                  ))}
                </div>

                {/* Recent transactions */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-foreground">Recent</p>
                    <p className="text-[10px] text-primary">See all</p>
                  </div>
                  <div className="mt-2 space-y-2">
                    {[
                      { name: "Grocery Store", amount: "-$84.32", category: "Food" },
                      { name: "Salary Deposit", amount: "+$3,200", category: "Income" },
                      { name: "Netflix", amount: "-$15.99", category: "Entertainment" },
                    ].map((tx) => (
                      <div key={tx.name} className="flex items-center gap-3 rounded-xl bg-card p-2 shadow-sm">
                        <div className="h-8 w-8 rounded-lg bg-muted" />
                        <div className="flex-1">
                          <p className="text-[10px] font-medium text-foreground">{tx.name}</p>
                          <p className="text-[8px] text-muted-foreground">{tx.category}</p>
                        </div>
                        <p
                          className={`text-[10px] font-semibold ${tx.amount.startsWith("+") ? "text-chart-4" : "text-foreground"}`}
                        >
                          {tx.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom nav */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around border-t border-border bg-card px-6 pb-6 pt-3">
                {[
                  { active: true, label: "Home" },
                  { active: false, label: "Stats" },
                  { active: false, label: "Cards" },
                  { active: false, label: "Profile" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-1">
                    <div className={`h-5 w-5 rounded-md ${item.active ? "bg-primary" : "bg-muted"}`} />
                    <span
                      className={`text-[8px] ${item.active ? "text-primary font-medium" : "text-muted-foreground"}`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-4 -z-10 rounded-[4rem] bg-gradient-to-b from-primary/20 via-accent/10 to-transparent blur-2xl" />
      </div>
    </div>
  )
}
