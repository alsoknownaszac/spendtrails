import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }

      const { width, height } = value.asset.metadata?.dimensions || { width: 800, height: 600 }

      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).height(600).fit('max').auto('format').url()}
            alt={value.alt || 'Image'}
            width={width}
            height={height}
            className="rounded-lg"
          />
          {value.caption && (
            <p className="mt-2 text-center text-sm text-muted-foreground">{value.caption}</p>
          )}
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      const target = !value.href.startsWith('/') ? '_blank' : undefined

      return (
        <Link
          href={value.href}
          rel={rel}
          target={target}
          className="text-primary underline underline-offset-4 hover:no-underline"
        >
          {children}
        </Link>
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold tracking-tight mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-semibold tracking-tight mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold tracking-tight mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-semibold tracking-tight mb-3">{children}</h4>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
}

interface PortableTextProps {
  value: any
  className?: string
}

export function SanityPortableText({ value, className }: PortableTextProps) {
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  )
}