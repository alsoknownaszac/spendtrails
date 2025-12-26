"use client"

import { Eye, Users, Heart } from "lucide-react"
import { useOptimizedCardHover } from "@/hooks/use-animation-performance"

const iconMap = {
  Eye,
  Users,
  Heart,
}

interface MissionCardProps {
  iconName: string
  title: string
  description: string
  index: number
}

export function MissionCard({ iconName, title, description, index }: MissionCardProps) {
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
      className="group rounded-2xl border border-border bg-card p-6 sm:p-8 transition-all ease-out hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 h-full flex flex-col focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:transform-none motion-reduce:hover:scale-100"
      style={{
        willChange: 'transform, box-shadow, border-color',
        transform: optimizedTransform,
        transitionDuration: optimizedDuration,
        backfaceVisibility: 'hidden', // Prevent flickering
      }}
      role="article"
      aria-labelledby={`mission-card-title-${index}`}
      aria-describedby={`mission-card-description-${index}`}
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-primary/20 flex-shrink-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        style={{
          willChange: 'transform, background-color',
          transform: 'translateZ(0)', // Force hardware acceleration
        }}
        aria-hidden="true"
      >
        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary transition-colors duration-300 ease-out motion-reduce:transition-none" />
      </div>
      <h3 
        id={`mission-card-title-${index}`}
        className="mt-4 sm:mt-6 font-semibold text-foreground group-hover:text-primary transition-colors duration-300 ease-out text-lg sm:text-xl motion-reduce:transition-none"
      >
        {title}
      </h3>
      <p 
        id={`mission-card-description-${index}`}
        className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed flex-grow"
      >
        {description}
      </p>
    </article>
  )
}