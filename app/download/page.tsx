import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TrustBadges } from "@/components/sections/trust-badges"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Smartphone, Monitor, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download Spendtrails on iOS, Android, or access via web. Start taking control of your spending in minutes.",
}

const benefits = [
  "Free to download and use",
  "Set up in under 5 minutes",
  "Syncs across all your devices",
  "No credit card required",
]

export default function DownloadPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-3xl text-center">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Get Spendtrails
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Download the app and start seeing your finances clearly. Available on iOS, Android, and web.
              </p>

              {/* Benefits List */}
              <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
                {benefits.map((benefit, index) => (
                  <AnimatedSection key={benefit} animation="fade-in-up" delay={index * 100}>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {benefit}
                    </li>
                  </AnimatedSection>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </section>

        {/* Download Options */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
              {/* iOS */}
              <AnimatedSection animation="slide-in-left" delay={0}>
                <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center h-full">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  </div>
                  <h2 className="mt-6 text-xl font-semibold text-foreground">iPhone & iPad</h2>
                  <p className="mt-2 text-sm text-muted-foreground">iOS 14.0 or later</p>
                  <Button asChild className="mt-6 w-full" size="lg">
                    <Link href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                      Download on App Store
                    </Link>
                  </Button>
                </div>
              </AnimatedSection>

              {/* Android */}
              <AnimatedSection animation="fade-in-up" delay={150}>
                <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center h-full">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                    </svg>
                  </div>
                  <h2 className="mt-6 text-xl font-semibold text-foreground">Android</h2>
                  <p className="mt-2 text-sm text-muted-foreground">Android 8.0 or later</p>
                  <Button asChild className="mt-6 w-full" size="lg">
                    <Link href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                      Get on Google Play
                    </Link>
                  </Button>
                </div>
              </AnimatedSection>

              {/* Web */}
              <AnimatedSection animation="slide-in-right" delay={300}>
                <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center h-full">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Monitor className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="mt-6 text-xl font-semibold text-foreground">Web App</h2>
                  <p className="mt-2 text-sm text-muted-foreground">Any modern browser</p>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-6 w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                    size="lg"
                  >
                    <Link href="https://app.spendtrails.com" target="_blank" rel="noopener noreferrer">
                      Open Web App
                    </Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* QR Code Section */}
        <AnimatedSection animation="fade-in-up">
          <section className="bg-muted/50 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-16">
                <div className="text-center md:text-left">
                  <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Scan to download</h2>
                  <p className="mt-2 text-muted-foreground">
                    Use your phone camera to scan the code and download instantly.
                  </p>
                </div>
                <div className="flex h-32 w-32 items-center justify-center rounded-xl bg-card border border-border">
                  <Smartphone className="h-12 w-12 text-muted-foreground/50" />
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Trust Section */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-in-up" className="mx-auto max-w-2xl text-center">
              <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Trusted by millions</h2>
              <p className="mt-2 text-muted-foreground">
                Join over 2 million users who trust Spendtrails with their financial clarity.
              </p>
            </AnimatedSection>
            <AnimatedSection animation="scale-in" delay={200} className="mx-auto mt-10 max-w-3xl">
              <TrustBadges variant="default" />
            </AnimatedSection>
          </div>
        </section>

        {/* Help Section */}
        <AnimatedSection animation="fade-in-up">
          <section className="border-t border-border py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-muted-foreground">Need help getting started?</p>
                <div className="flex gap-4">
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/how-it-works">How It Works</Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="mailto:support@spendtrails.com">Contact Support</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  )
}
