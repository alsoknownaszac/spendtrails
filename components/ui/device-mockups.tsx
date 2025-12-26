"use client"

import { useEffect, useRef, useState } from "react"

interface DeviceMockupsProps {
  className?: string
}

export function DeviceMockups({ className = "" }: DeviceMockupsProps) {
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
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`relative flex items-end justify-center ${className}`}>
      {/* iPad mockup - positioned behind and to the left */}
      <div
        className={`relative transition-all duration-1000 ease-out ${
          isVisible ? "translate-x-0 translate-y-0 opacity-100" : "-translate-x-20 translate-y-10 opacity-0"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        <div className="relative animate-float-slow">
          {/* iPad frame */}
          <div className="relative w-[340px] rounded-[1.5rem] bg-gradient-to-b from-gray-700 via-gray-800 to-gray-700 p-2 shadow-2xl sm:w-[420px] lg:w-[480px]">
            {/* Screen bezel */}
            <div className="relative overflow-hidden rounded-[1.25rem] bg-black p-1">
              {/* Camera */}
              <div className="absolute top-3 left-1/2 z-20 h-2 w-2 -translate-x-1/2 rounded-full bg-gray-700" />

              {/* Screen */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1rem] bg-background">
                {/* iPad App content - Dashboard view */}
                <div className="h-full p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <svg
                          className="h-5 w-5 text-primary-foreground"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-foreground">Spendtrails</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-muted" />
                    </div>
                  </div>

                  {/* Main content grid */}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {/* Balance overview */}
                    <div className="col-span-2 rounded-xl bg-primary p-4 text-primary-foreground">
                      <p className="text-[10px] opacity-80">Total Balance</p>
                      <p className="mt-1 text-xl font-bold sm:text-2xl">$12,458.32</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] text-accent">
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 10l7-7m0 0l7 7m-7-7v18"
                            />
                          </svg>
                          +2.4%
                        </div>
                        <span className="text-[10px] opacity-80">vs last month</span>
                      </div>
                    </div>

                    {/* Quick stats */}
                    <div className="space-y-3">
                      <div className="rounded-xl bg-card p-3 shadow-sm">
                        <p className="text-[9px] text-muted-foreground">Income</p>
                        <p className="text-sm font-semibold text-chart-4">+$4,200</p>
                      </div>
                      <div className="rounded-xl bg-card p-3 shadow-sm">
                        <p className="text-[9px] text-muted-foreground">Expenses</p>
                        <p className="text-sm font-semibold text-foreground">-$2,847</p>
                      </div>
                    </div>

                    {/* Spending chart */}
                    <div className="col-span-2 rounded-xl bg-card p-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-medium text-foreground">Spending Overview</p>
                        <p className="text-[9px] text-muted-foreground">This month</p>
                      </div>
                      {/* Chart bars */}
                      <div className="mt-3 flex items-end justify-between gap-1">
                        {[40, 65, 45, 80, 55, 70, 50].map((height, i) => (
                          <div
                            key={i}
                            className="w-full rounded-t bg-primary/80 transition-all duration-500"
                            style={{
                              height: `${height}px`,
                              animationDelay: `${i * 100}ms`,
                            }}
                          />
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between text-[8px] text-muted-foreground">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                      </div>
                    </div>

                    {/* Budget progress */}
                    <div className="rounded-xl bg-card p-3 shadow-sm">
                      <p className="text-[9px] text-muted-foreground">Budget</p>
                      <p className="text-sm font-semibold text-foreground">68%</p>
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-[68%] rounded-full bg-accent" />
                      </div>
                    </div>
                  </div>

                  {/* Recent transactions */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-medium text-foreground">Recent Transactions</p>
                      <p className="text-[9px] text-primary">View all</p>
                    </div>
                    <div className="mt-2 space-y-2">
                      {[
                        { name: "Grocery Store", amount: "-$84.32", icon: "🛒" },
                        { name: "Salary Deposit", amount: "+$3,200", icon: "💰" },
                        { name: "Electric Bill", amount: "-$142.00", icon: "⚡" },
                      ].map((tx) => (
                        <div key={tx.name} className="flex items-center gap-2 rounded-lg bg-muted/50 p-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-background text-sm">
                            {tx.icon}
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] font-medium text-foreground">{tx.name}</p>
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
              </div>
            </div>
          </div>

          {/* iPad glow */}
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/15 via-accent/10 to-transparent blur-2xl" />
        </div>
      </div>

      {/* iPhone mockup - positioned in front and to the right */}
      <div
        className={`absolute -right-4 bottom-0 z-10 transition-all duration-1000 ease-out sm:right-0 lg:-right-8 ${
          isVisible ? "translate-x-0 translate-y-0 opacity-100" : "translate-x-20 translate-y-10 opacity-0"
        }`}
        style={{ transitionDelay: "400ms" }}
      >
        <div className="relative animate-float">
          {/* iPhone frame */}
          <div className="relative w-[140px] rounded-[2rem] bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 p-2 shadow-2xl sm:w-[160px] lg:w-[180px]">
            {/* Inner frame */}
            <div className="relative overflow-hidden rounded-[1.75rem] bg-black">
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 z-20 h-5 w-16 -translate-x-1/2 rounded-full bg-black" />

              {/* Screen */}
              <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[1.75rem] bg-background">
                {/* Status bar */}
                <div className="flex items-center justify-between px-5 pt-3 text-[8px] font-medium text-foreground">
                  <span>9:41</span>
                  <div className="flex items-center gap-0.5">
                    <svg className="h-2 w-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z" />
                    </svg>
                    <div className="flex h-2 w-4 items-center rounded-[2px] border border-current px-0.5">
                      <div className="h-1 w-2.5 rounded-[1px] bg-current" />
                    </div>
                  </div>
                </div>

                {/* App content - Mobile view */}
                <div className="px-3 pt-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[8px] text-muted-foreground">Good morning</p>
                      <p className="text-[10px] font-semibold text-foreground">Welcome back</p>
                    </div>
                    <div className="h-6 w-6 rounded-full bg-primary/10" />
                  </div>

                  {/* Balance card */}
                  <div className="mt-3 rounded-xl bg-primary p-3 text-primary-foreground">
                    <p className="text-[8px] opacity-80">Total Balance</p>
                    <p className="mt-0.5 text-lg font-bold">$12,458</p>
                    <div className="mt-2 flex items-center gap-1">
                      <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[7px] text-accent">+2.4%</span>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="mt-3 grid grid-cols-4 gap-1.5">
                    {["Budget", "Bills", "Goals", "Stats"].map((action) => (
                      <div key={action} className="flex flex-col items-center gap-0.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
                          <div className="h-3 w-3 rounded bg-primary/30" />
                        </div>
                        <span className="text-[6px] text-muted-foreground">{action}</span>
                      </div>
                    ))}
                  </div>

                  {/* Transactions */}
                  <div className="mt-3">
                    <p className="text-[8px] font-semibold text-foreground">Recent</p>
                    <div className="mt-1.5 space-y-1.5">
                      {[
                        { name: "Grocery", amount: "-$84", positive: false },
                        { name: "Salary", amount: "+$3.2k", positive: true },
                        { name: "Netflix", amount: "-$16", positive: false },
                      ].map((tx) => (
                        <div key={tx.name} className="flex items-center gap-2 rounded-lg bg-card p-1.5 shadow-sm">
                          <div className="h-5 w-5 rounded bg-muted" />
                          <div className="flex-1">
                            <p className="text-[7px] font-medium text-foreground">{tx.name}</p>
                          </div>
                          <p className={`text-[7px] font-semibold ${tx.positive ? "text-chart-4" : "text-foreground"}`}>
                            {tx.amount}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom nav */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around border-t border-border bg-card px-3 pb-4 pt-2">
                  {[true, false, false, false].map((active, i) => (
                    <div key={i} className="flex flex-col items-center gap-0.5">
                      <div className={`h-3.5 w-3.5 rounded ${active ? "bg-primary" : "bg-muted"}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* iPhone glow */}
          <div className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-gradient-to-b from-accent/20 via-primary/15 to-transparent blur-xl" />
        </div>
      </div>
    </div>
  )
}
