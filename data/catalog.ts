import { featuredArtists, playlists } from './catalog.data'
import type { CatalogPlaylist } from './types'

export type { CatalogArtist, CatalogPlaylist, CatalogTrack } from './types'
export { featuredArtists, playlists }

export function getPlaylist(slug: string): CatalogPlaylist | undefined {
  return playlists.find((playlist) => playlist.slug === slug)
}

export function legacyPlaylistRedirects() {
  return playlists.map((playlist) => ({
    source: `/playlist/${playlist.legacyId}`,
    destination: `/playlist/${playlist.slug}`,
    permanent: true,
  }))
}
