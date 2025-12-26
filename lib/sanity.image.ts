import imageUrlBuilder from '@sanity/image-url'
import { client } from './sanity.client'

// Use the live client for image URL building to ensure compatibility
const builder = imageUrlBuilder(client.getLiveClient())

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper function for Next.js Image component
export function getImageDimensions(image: any) {
  if (!image?.asset?._ref) return { width: 0, height: 0 }
  
  const dimensions = image.asset._ref.split('-')[2]
  const [width, height] = dimensions.split('x').map(Number)
  
  return { width, height }
}

// Generate blur placeholder for images
export function getBlurDataURL(image: any) {
  if (!image?.asset?._ref) return undefined
  
  return urlFor(image)
    .width(20)
    .height(20)
    .blur(10)
    .format('webp')
    .url()
}