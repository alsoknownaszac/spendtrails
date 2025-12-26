"use client"

import { Brain, Globe, GraduationCap } from "lucide-react"
import { useOptimizedCardHover } from "@/hooks/use-animation-performance"

const iconMap = {
  Brain,
  Globe,
  GraduationCap,
}

interface VisionCardProps {
  iconName: string
  title: string
  description: string
  highlight?: string
  index: number
}

export function VisionCard({ iconName, title, description, highlight, index }: VisionCardProps) {
  const Icon = iconMap[iconName as keyof typeof iconMap]
  const { 
    handleMouseEnter, 
    handleMouseLeave, 
    optimizedTransform, 
    optimizedDuration 
  } = useOptimizedCardHover()
  
  if (!Icon) {
    console.warn(`Icon "${iconName}" not found in iconMap`)
    return null
  }

  return (
    <article 
      className="group rounded-2xl border border-border bg-card p-6 sm:p-8 transition-all ease-out hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 h-full relative overflow-hidden flex flex-col focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:transform-none motion-reduce:hover:scale-100"
      style={{
        willChange: 'transform, box-shadow, border-color',
        transform: optimizedTransform,
        transitionDuration: optimizedDuration,
        backfaceVisibility: 'hidden', // Prevent flickering
      }}
      role="article"
      aria-labelledby={`vision-card-title-${index}`}
      aria-describedby={`vision-card-description-${index}`}
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {highlight && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <span 
            className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary transition-all duration-300 ease-out group-hover:bg-primary/20 motion-reduce:transition-none"
            style={{
              willChange: 'background-color',
            }}
            aria-label={`Feature highlight: ${highlight}`}
          >
            {highlight}
          </span>
        </div>
      )}
      
      <div 
        className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 transition-all duration-300 ease-out group-hover:scale-110 group-hover:from-primary/20 group-hover:to-primary/30 flex-shrink-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        style={{
          willChange: 'transform, background-image',
          transform: 'translateZ(0)', // Force hardware acceleration
        }}
        aria-hidden="true"
      >
        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary transition-colors duration-300 ease-out motion-reduce:transition-none" />
      </div>
      
      <h3 
        id={`vision-card-title-${index}`}
        className="mt-4 sm:mt-6 font-semibold text-foreground group-hover:text-primary transition-colors duration-300 ease-out text-lg sm:text-xl motion-reduce:transition-none"
      >
        {title}
      </h3>
      
      <p 
        id={`vision-card-description-${index}`}
        className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed flex-grow"
      >
        {description}
      </p>
    </article>
  )
}