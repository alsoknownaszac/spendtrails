"use client"

import { useEffect, useRef, useState } from 'react'
import { 
  AnimationPerformanceMonitor, 
  getDevicePerformanceLevel, 
  optimizeAnimationsForDevice,
  type PerformanceMetrics 
} from '@/lib/animation-performance'

/**
 * Hook to monitor and optimize animation performance
 */
export function useAnimationPerformance() {
  const [performanceLevel, setPerformanceLevel] = useState<'high' | 'medium' | 'low'>('medium')
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const monitorRef = useRef<AnimationPerformanceMonitor | null>(null)

  useEffect(() => {
    // Initialize performance monitoring
    const level = getDevicePerformanceLevel()
    setPerformanceLevel(level)
    
    // Apply device-specific optimizations
    optimizeAnimationsForDevice()
    
    // Initialize performance monitor
    monitorRef.current = new AnimationPerformanceMonitor()
    
    return () => {
      if (monitorRef.current) {
        monitorRef.current.stopMonitoring()
      }
    }
  }, [])

  const startMonitoring = () => {
    if (monitorRef.current) {
      monitorRef.current.startMonitoring()
    }
  }

  const stopMonitoring = () => {
    if (monitorRef.current) {
      const result = monitorRef.current.stopMonitoring()
      setMetrics(result)
      return result
    }
    return null
  }

  const resetMonitoring = () => {
    if (monitorRef.current) {
      monitorRef.current.reset()
      setMetrics(null)
    }
  }

  return {
    performanceLevel,
    metrics,
    startMonitoring,
    stopMonitoring,
    resetMonitoring,
  }
}

/**
 * Hook for optimized card hover effects
 */
export function useOptimizedCardHover() {
  const [isHovered, setIsHovered] = useState(false)
  const [performanceLevel] = useState(() => getDevicePerformanceLevel())

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  // Get optimized transform values based on performance level
  const getOptimizedTransform = () => {
    if (!isHovered) return 'translateZ(0)'
    
    switch (performanceLevel) {
      case 'high':
        return 'translateY(-4px) scale(1.02) translateZ(0)'
      case 'medium':
        return 'translateY(-3px) scale(1.015) translateZ(0)'
      case 'low':
        return 'translateY(-2px) scale(1.01) translateZ(0)'
      default:
        return 'translateY(-4px) scale(1.02) translateZ(0)'
    }
  }

  const getOptimizedDuration = () => {
    switch (performanceLevel) {
      case 'high':
        return '300ms'
      case 'medium':
        return '250ms'
      case 'low':
        return '200ms'
      default:
        return '300ms'
    }
  }

  return {
    isHovered,
    performanceLevel,
    handleMouseEnter,
    handleMouseLeave,
    optimizedTransform: getOptimizedTransform(),
    optimizedDuration: getOptimizedDuration(),
  }
}