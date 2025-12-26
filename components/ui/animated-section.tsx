"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fade-in-up" | "fade-in" | "slide-in-left" | "slide-in-right" | "scale-in"
  delay?: number
  threshold?: number
}

export function AnimatedSection({
  children,
  className = "",
  animation = "fade-in-up",
  delay = 0,
  threshold = 0.15,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    // Use IntersectionObserver with optimized settings for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update visibility based on intersection state (both entering and leaving)
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold,
        // Optimized root margin for better performance and user experience
        rootMargin: "0px 0px -50px 0px",
        // Use root for better performance
        root: null,
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold])

  // Get transform values based on animation type
  const getInitialTransform = () => {
    switch (animation) {
      case "fade-in-up":
        return "translateY(30px)"
      case "slide-in-left":
        return "translateX(-50px)"
      case "slide-in-right":
        return "translateX(50px)"
      case "scale-in":
        return "scale(0.95)"
      default:
        return "none"
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? "translateX(0) translateY(0) scale(1) translateZ(0)" 
          : `${getInitialTransform()} translateZ(0)`,
        transition: `opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
        willChange: isVisible ? "auto" : "opacity, transform",
        backfaceVisibility: "hidden", // Prevent flickering
      }}
    >
      {children}
    </div>
  )
}
