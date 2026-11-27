export interface CatalogTrack {
  id: string
  title: string
  artist: string
  url: string
}

export interface CatalogPlaylist {
  slug: string
  /** UUID used in URLs by the 2022 version; kept for redirects. */
  legacyId: string
  title: string
  imageUrl: string
  tracks: CatalogTrack[]
}

export interface CatalogArtist {
  id: string
  name: string
  imageUrl: string
}
