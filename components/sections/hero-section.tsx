"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/ui/animated-section"
import { DeviceMockups } from "@/components/ui/device-mockups"
import { TrustBadges } from "@/components/sections/trust-badges"
import { SanityImage } from "@/components/sanity/sanity-image"

interface HeroData {
  headline: string
  highlightText?: string
  subheadline: string
  primaryCta: {
    text: string
    url: string
    variant?: string
    size?: string
  }
  secondaryCta?: {
    text: string
    url: string
    variant?: string
    size?: string
  }
  backgroundImage?: any
}

interface HeroSectionProps {
  data: HeroData
}

export function HeroSection({ data }: HeroSectionProps) {
  const {
    headline,
    highlightText,
    subheadline,
    primaryCta,
    secondaryCta,
    backgroundImage,
  } = data

  // Split headline to highlight specific text
  const renderHeadline = () => {
    if (!highlightText) {
      return headline
    }

    const parts = headline.split(highlightText)
    if (parts.length !== 2) {
      return headline
    }

    return (
      <>
        {parts[0]}
        <span className="bg-gradient-to-r from-primary to-chart-4 bg-clip-text text-transparent">
          {highlightText}
        </span>
        {parts[1]}
      </>
    )
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 via-background to-background py-16 sm:py-20 lg:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundImage ? (
          <SanityImage
            image={backgroundImage}
            alt="Hero background"
            className="absolute inset-0 h-full w-full object-cover opacity-10"
            priority
          />
        ) : (
          <>
            <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/5 to-transparent blur-3xl" />
            <div className="absolute top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-l from-accent/10 to-transparent blur-3xl" />
          </>
        )}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <AnimatedSection animation="fade-in-up">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {renderHeadline()}
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-up" delay={150}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
              {subheadline}
            </p>
          </AnimatedSection>

          {/* CTAs */}
          <AnimatedSection animation="fade-in-up" delay={300}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size={primaryCta.size as any || "lg"}
                variant={primaryCta.variant as any || "default"}
                className="h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
              >
                <Link href={primaryCta.url}>{primaryCta.text}</Link>
              </Button>
              
              {secondaryCta && (
                <Button
                  asChild
                  variant={secondaryCta.variant as any || "outline"}
                  size={secondaryCta.size as any || "lg"}
                  className="h-12 px-8 text-base bg-transparent backdrop-blur-sm"
                >
                  <Link href={secondaryCta.url}>{secondaryCta.text}</Link>
                </Button>
              )}
            </div>
          </AnimatedSection>
        </div>

        <div className="relative mt-16 flex justify-center lg:mt-20">
          <DeviceMockups />
        </div>

        {/* Trust signals below devices */}
        <AnimatedSection animation="fade-in" delay={600}>
          <div className="mt-12 flex justify-center">
            <TrustBadges variant="inline" />
          </div>
        </AnimatedSection>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}