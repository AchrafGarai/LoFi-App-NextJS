import type { NextConfig } from 'next'
import { legacyPlaylistRedirects } from './data/catalog'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [new URL('https://res.cloudinary.com/dehs50yqa/**')],
  },
  // Keep links to the 2022 version (/playlist/<uuid>) working.
  async redirects() {
    return legacyPlaylistRedirects()
  },
}

export default nextConfig
