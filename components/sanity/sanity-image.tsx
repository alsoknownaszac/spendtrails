import Image from 'next/image'
import { urlFor, getImageDimensions, getBlurDataURL } from '@/lib/sanity.image'

interface SanityImageProps {
  image: any
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export function SanityImage({
  image,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
}: SanityImageProps) {
  if (!image?.asset?._ref) {
    return null
  }

  const { width: originalWidth, height: originalHeight } = getImageDimensions(image)
  const displayWidth = width || originalWidth
  const displayHeight = height || originalHeight

  const imageUrl = urlFor(image)
    .width(displayWidth)
    .height(displayHeight)
    .fit('max')
    .auto('format')
    .url()

  const blurDataURL = getBlurDataURL(image)

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={displayWidth}
      height={displayHeight}
      className={className}
      priority={priority}
      sizes={sizes}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
    />
  )
}