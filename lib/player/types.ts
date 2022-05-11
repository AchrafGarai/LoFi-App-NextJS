export type AudioState = {
  duration: number
  playing: boolean
  volume: number
}

export type Track = {
  id: string
  url: string
  title: string
  artist: Artist
}

export type State = AudioState & {
  playlist: Playlist
  currentTrack: Track | null
  currentTrackIndex: number | null
}

export type Playlist = {
  id: string
  title: string
  imageUrl: string
  tracks: Track[]
}

export type Artist = {
  id: string
  name: string
  imageUrl: string
  tracks: Track[]
}
