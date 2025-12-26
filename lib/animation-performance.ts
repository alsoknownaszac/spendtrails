/**
 * Animation performance monitoring utilities
 * Helps verify animation performance across different devices
 */

export interface PerformanceMetrics {
  fps: number
  frameDrops: number
  averageFrameTime: number
  isPerformant: boolean
}

/**
 * Monitor animation performance during card interactions
 */
export class AnimationPerformanceMonitor {
  private frameCount = 0
  private lastTime = 0
  private frameDrops = 0
  private frameTimes: number[] = []
  private isMonitoring = false
  private animationId: number | null = null

  /**
   * Start monitoring animation performance
   */
  startMonitoring(): void {
    if (this.isMonitoring) return

    this.isMonitoring = true
    this.frameCount = 0
    this.frameDrops = 0
    this.frameTimes = []
    this.lastTime = performance.now()

    const monitor = (currentTime: number) => {
      if (!this.isMonitoring) return

      const deltaTime = currentTime - this.lastTime
      this.frameTimes.push(deltaTime)
      
      // Count frame drops (frames taking longer than 16.67ms for 60fps)
      if (deltaTime > 16.67) {
        this.frameDrops++
      }

      this.frameCount++
      this.lastTime = currentTime
      
      this.animationId = requestAnimationFrame(monitor)
    }

    this.animationId = requestAnimationFrame(monitor)
  }

  /**
   * Stop monitoring and return performance metrics
   */
  stopMonitoring(): PerformanceMetrics {
    this.isMonitoring = false
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }

    const totalTime = this.frameTimes.reduce((sum, time) => sum + time, 0)
    const averageFrameTime = totalTime / this.frameTimes.length || 0
    const fps = this.frameCount > 0 ? 1000 / averageFrameTime : 0
    const frameDropPercentage = this.frameCount > 0 ? (this.frameDrops / this.frameCount) * 100 : 0

    return {
      fps: Math.round(fps),
      frameDrops: this.frameDrops,
      averageFrameTime: Math.round(averageFrameTime * 100) / 100,
      isPerformant: fps >= 55 && frameDropPercentage < 10 // Consider performant if >55fps with <10% drops
    }
  }

  /**
   * Reset monitoring state
   */
  reset(): void {
    this.stopMonitoring()
    this.frameCount = 0
    this.frameDrops = 0
    this.frameTimes = []
  }
}

/**
 * Detect device performance capabilities
 */
export function getDevicePerformanceLevel(): 'high' | 'medium' | 'low' {
  // Check for hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 1
  
  // Check for device memory (if available)
  const memory = (navigator as any).deviceMemory || 4
  
  // Check for connection type (if available)
  const connection = (navigator as any).connection
  const effectiveType = connection?.effectiveType || '4g'
  
  // Determine performance level based on available metrics
  if (cores >= 8 && memory >= 8 && effectiveType === '4g') {
    return 'high'
  } else if (cores >= 4 && memory >= 4) {
    return 'medium'
  } else {
    return 'low'
  }
}

/**
 * Apply performance-based animation settings
 */
export function getOptimizedAnimationSettings(performanceLevel: 'high' | 'medium' | 'low') {
  switch (performanceLevel) {
    case 'high':
      return {
        duration: 300,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        enableComplexAnimations: true,
        staggerDelay: 200,
      }
    case 'medium':
      return {
        duration: 250,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        enableComplexAnimations: true,
        staggerDelay: 150,
      }
    case 'low':
      return {
        duration: 200,
        easing: 'ease-out',
        enableComplexAnimations: false,
        staggerDelay: 100,
      }
  }
}

/**
 * Check if browser supports hardware acceleration
 */
export function supportsHardwareAcceleration(): boolean {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  return !!gl
}

/**
 * Optimize animations based on device capabilities
 */
export function optimizeAnimationsForDevice(): void {
  const performanceLevel = getDevicePerformanceLevel()
  const supportsHW = supportsHardwareAcceleration()
  
  // Add performance class to document for CSS targeting
  document.documentElement.classList.add(`perf-${performanceLevel}`)
  
  if (supportsHW) {
    document.documentElement.classList.add('hw-accelerated')
  }
  
  // Disable complex animations on low-performance devices
  if (performanceLevel === 'low') {
    document.documentElement.classList.add('reduce-animations')
  }
}