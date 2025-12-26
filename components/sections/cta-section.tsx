import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AppStoreButtons } from "@/components/ui/app-store-buttons"

interface CTASectionProps {
  headline?: string
  subheadline?: string
  variant?: "default" | "compact"
  showAppButtons?: boolean
}

export function CTASection({
  headline = "Ready to take control of your spending?",
  subheadline = "Join over 2 million users who trust Spendtrails for financial clarity.",
  variant = "default",
  showAppButtons = true,
}: CTASectionProps) {
  if (variant === "compact") {
    return (
      <section className="bg-primary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-semibold text-primary-foreground sm:text-2xl">{headline}</h2>
              <p className="mt-1 text-sm text-primary-foreground/80">{subheadline}</p>
            </div>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/download">Download Free</Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-muted py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{subheadline}</p>
          {showAppButtons ? (
            <div className="mt-8 flex justify-center">
              <AppStoreButtons />
            </div>
          ) : (
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/download">Get Started Free</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
