"use client"

import { Star } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  handle?: string
  avatar?: string
  content: string
  rating?: number
  source: "twitter" | "appstore" | "playstore"
  date?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    handle: "@sarahmitch",
    content:
      "Switched to @spendtrails last month and already have so much more clarity on where my money goes. The interface is beautiful!",
    source: "twitter",
  },
  {
    id: 2,
    name: "budgetpro2024",
    content:
      "Finally an app that doesn't overwhelm me with features. Simple, clean, and actually helps me save money. Been using it for 6 months!",
    rating: 5,
    source: "appstore",
  },
  {
    id: 3,
    name: "Michael Chen",
    handle: "@mchen_dev",
    content:
      "The subscription tracker in @spendtrails just found $47/month in services I forgot I was paying for. App paid for itself instantly.",
    source: "twitter",
  },
  {
    id: 4,
    name: "JessicaR_Finance",
    content:
      "Love how Spendtrails shows my spending trends over time. The charts are gorgeous and actually useful. Highly recommend for anyone trying to budget better.",
    rating: 5,
    source: "appstore",
  },
  {
    id: 5,
    name: "David Park",
    handle: "@dpark_nyc",
    content:
      "Been looking for a Mint replacement and @spendtrails is IT. Clean design, fast sync, and I love the bill reminders feature.",
    source: "twitter",
  },
  {
    id: 6,
    name: "MoneyMinimal",
    content:
      "This is the budgeting app I've been waiting for. No clutter, no upsells, just a beautiful way to track spending. The investment tracking is a bonus!",
    rating: 5,
    source: "playstore",
  },
  {
    id: 7,
    name: "Emma Rodriguez",
    handle: "@emma_fintech",
    content:
      "My favorite thing about @spendtrails? It actually makes me WANT to check my finances. That's never happened before with any app.",
    source: "twitter",
  },
  {
    id: 8,
    name: "SmartSaver101",
    content:
      "The security features give me peace of mind. Bank-level encryption and they never sell your data. Finally a finance app I can trust!",
    rating: 5,
    source: "appstore",
  },
  {
    id: 9,
    name: "Alex Turner",
    handle: "@alexturner_uk",
    content:
      "Just hit my first savings goal using @spendtrails! The visual progress tracker kept me motivated the whole way.",
    source: "twitter",
  },
  {
    id: 10,
    name: "ClearFinances",
    content:
      "Switched from three different apps to just Spendtrails. Budgeting, bills, and investments all in one place. The design is top-notch.",
    rating: 5,
    source: "playstore",
  },
]

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const isTwitter = testimonial.source === "twitter"

  return (
    <div className="group relative mb-4 w-full rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-sm font-semibold text-primary">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
            {testimonial.handle && <p className="text-xs text-muted-foreground">{testimonial.handle}</p>}
          </div>
        </div>

        {/* Source icon */}
        {isTwitter ? (
          <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        ) : (
          <div className="flex items-center gap-0.5">
            {[...Array(testimonial.rating || 5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">{testimonial.content}</p>

      {/* Source badge */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {testimonial.source === "twitter" && "Twitter"}
          {testimonial.source === "appstore" && "App Store Review"}
          {testimonial.source === "playstore" && "Play Store Review"}
        </span>
      </div>
    </div>
  )
}

export function TestimonialsMarquee() {
  // Split testimonials into three columns
  const column1 = testimonials.filter((_, i) => i % 3 === 0)
  const column2 = testimonials.filter((_, i) => i % 3 === 1)
  const column3 = testimonials.filter((_, i) => i % 3 === 2)

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            People love Spendtrails
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join millions of users who have taken control of their finances
          </p>
        </div>

        {/* Marquee container */}
        <div className="marquee-container relative h-[600px] overflow-hidden rounded-2xl">
          {/* Gradient overlays for smooth fade effect */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-background to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-background to-transparent" />

          {/* Three column marquee */}
          <div className="flex gap-4 h-full px-2">
            {/* Column 1 - scrolls up */}
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee-vertical">
                {[...column1, ...column1].map((testimonial, index) => (
                  <TestimonialCard key={`col1-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* Column 2 - scrolls down (reverse) */}
            <div className="hidden md:flex flex-1 overflow-hidden">
              <div className="animate-marquee-vertical-reverse">
                {[...column2, ...column2].map((testimonial, index) => (
                  <TestimonialCard key={`col2-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* Column 3 - scrolls up */}
            <div className="hidden lg:flex flex-1 overflow-hidden">
              <div className="animate-marquee-vertical">
                {[...column3, ...column3].map((testimonial, index) => (
                  <TestimonialCard key={`col3-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
