/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio'
import { validateSanityConfig } from '../../../lib/sanity.config-validator'

// Dynamically import config only when needed
async function getStudioConfig() {
  const config = await import('../../../sanity/sanity.config')
  return config.default
}

export default async function StudioPage() {
  // Check if Sanity is properly configured
  const validation = validateSanityConfig({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
    token: process.env.SANITY_API_READ_TOKEN
  })

  if (!validation.isValid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Sanity Studio Not Available
          </h1>
          <p className="mb-4 text-gray-600">
            The Sanity Studio is not available because the CMS is not properly configured.
          </p>
          <div className="mb-4">
            <h2 className="mb-2 font-semibold text-gray-800">Configuration Issues:</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
              {validation.issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-gray-500">
            Please configure your Sanity environment variables to access the studio.
          </p>
        </div>
      </div>
    )
  }

  const config = await getStudioConfig()
  return <NextStudio config={config} />
}

export const dynamic = 'force-dynamic'