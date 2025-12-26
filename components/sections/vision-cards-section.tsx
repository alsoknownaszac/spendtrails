"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { VisionCard } from "./vision-card"
import { visionCards } from "@/lib/mission-vision-data"

export function VisionCardsSection() {
  return (
    <section className="bg-muted/50 py-16 sm:py-24" aria-labelledby="vision-section-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-in-up" className="mx-auto max-w-2xl text-center">
          <h2 id="vision-section-title" className="text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
            Our Vision
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Looking ahead, we're building the future of personal finance with innovative features and global reach.
          </p>
        </AnimatedSection>

        <div 
          className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10"
          role="region"
          aria-label="Vision cards"
        >
          {visionCards.map((card, index) => (
            <AnimatedSection
              key={card.title}
              animation="fade-in-up"
              delay={index * 200}
              threshold={0.1}
              className="flex"
            >
              <VisionCard
                iconName={card.iconName}
                title={card.title}
                description={card.description}
                highlight={card.highlight}
                index={index}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}