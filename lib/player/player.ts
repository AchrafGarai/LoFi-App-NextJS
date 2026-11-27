import type { CatalogPlaylist, CatalogTrack } from '@/data/catalog'
import {
  createQueue,
  currentIndex,
  nextPosition,
  nextRepeatMode,
  previousPosition,
  withPosition,
  withShuffle,
  withTrack,
  type Queue,
  type RepeatMode,
} from './queue'

export type PlaybackStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error'

export interface PlayerState {
  playlist: Pick<CatalogPlaylist, 'slug' | 'title' | 'imageUrl'> | null
  track: CatalogTrack | null
  trackIndex: number | null
  status: PlaybackStatus
  duration: number
  volume: number
  muted: boolean
  shuffle: boolean
  repeat: RepeatMode
}

const STORAGE_KEY = 'lofi:player'
/** "Previous" restarts the current track instead when it has played this long. */
const RESTART_THRESHOLD = 3

export const initialState: PlayerState = {
  playlist: null,
  track: null,
  trackIndex: null,
  status: 'idle',
  duration: 0,
  volume: 0.8,
  muted: false,
  shuffle: false,
  repeat: 'off',
}

type Listener = () => void

/**
 * The audio engine: one `<audio>` element for the whole app, exposed as an
 * external store for `useSyncExternalStore`.
 *
 * The playback position changes several times a second, so it lives in a
 * separate channel (`subscribeTime`) and only the components that show it
 * re-render.
 */
export class Player {
  private state = initialState
  private queue: Queue | null = null
  private tracks: CatalogTrack[] = []
  private audio: HTMLAudioElement | null = null
  private time = 0
  private listeners = new Set<Listener>()
  private timeListeners = new Set<Listener>()

  /* ---- store API ------------------------------------------------------- */

  subscribe = (listener: Listener) => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  subscribeTime = (listener: Listener) => {
    this.timeListeners.add(listener)
    return () => this.timeListeners.delete(listener)
  }

  getSnapshot = () => this.state
  getServerSnapshot = () => initialState
  getTime = () => this.time
  getServerTime = () => 0

  /* ---- commands -------------------------------------------------------- */

  /** Start a playlist at a track, or toggle play/pause if it is already that track. */
  playTrack(playlist: CatalogPlaylist, trackIndex = 0) {
    const sameTrack =
      this.state.playlist?.slug === playlist.slug && this.state.trackIndex === trackIndex
    if (sameTrack) return this.toggle()

    if (this.state.playlist?.slug === playlist.slug && this.queue) {
      this.queue = withTrack(this.queue, trackIndex)
    } else {
      this.tracks = playlist.tracks
      this.queue = createQueue(playlist.tracks.length, trackIndex, {
        shuffle: this.state.shuffle,
        repeat: this.state.repeat,
      })
    }

    this.setState({
      playlist: { slug: playlist.slug, title: playlist.title, imageUrl: playlist.imageUrl },
    })
    this.load(true)
  }

  play() {
    const audio = this.audio
    if (!audio || !this.state.track) return
    audio.play().catch((error: unknown) => {
      // Interrupted by a newer load() or pause(); not a real failure.
      if (error instanceof DOMException && error.name === 'AbortError') return
      // Autoplay blocked: wait for the user to press play.
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        this.setState({ status: 'paused' })
        return
      }
      this.setState({ status: 'error' })
    })
  }

  pause() {
    this.audio?.pause()
  }

  toggle() {
    if (this.state.status === 'playing' || this.state.status === 'loading') this.pause()
    else this.play()
  }

  next() {
    if (!this.queue) return
    const position = nextPosition(this.queue)
    if (position === null) return
    this.queue = withPosition(this.queue, position)
    this.load(true)
  }

  previous() {
    if (!this.queue) return
    if (this.time > RESTART_THRESHOLD) return this.seek(0)
    this.queue = withPosition(this.queue, previousPosition(this.queue))
    this.load(true)
  }

  seek(seconds: number) {
    const audio = this.audio
    if (!audio || !Number.isFinite(audio.duration)) return
    audio.currentTime = Math.min(Math.max(seconds, 0), audio.duration)
    this.setTime(audio.currentTime)
  }

  seekBy(delta: number) {
    this.seek(this.time + delta)
  }

  setVolume(volume: number) {
    const value = Math.min(Math.max(volume, 0), 1)
    if (this.audio) {
      this.audio.volume = value
      this.audio.muted = value === 0 ? this.audio.muted : false
    }
    this.setState({ volume: value, muted: value === 0 ? this.state.muted : false })
    this.persist()
  }

  toggleMute() {
    const muted = !this.state.muted
    if (this.audio) this.audio.muted = muted
    this.setState({ muted })
    this.persist()
  }

  toggleShuffle() {
    const shuffle = !this.state.shuffle
    if (this.queue) this.queue = withShuffle(this.queue, shuffle)
    this.setState({ shuffle })
    this.persist()
  }

  cycleRepeat() {
    const repeat = nextRepeatMode(this.state.repeat)
    if (this.queue) this.queue = { ...this.queue, repeat }
    this.setState({ repeat })
    this.persist()
  }

  /* ---- setup ----------------------------------------------------------- */

  /** Creates the audio element once, on the client. Safe to call repeatedly. */
  attach() {
    if (this.audio || typeof window === 'undefined') return
    this.restore()

    const audio = new Audio()
    audio.preload = 'auto'
    audio.volume = this.state.volume
    audio.muted = this.state.muted

    audio.addEventListener('loadstart', () => this.setState({ status: 'loading', duration: 0 }))
    audio.addEventListener('durationchange', () =>
      this.setState({ duration: Number.isFinite(audio.duration) ? audio.duration : 0 }),
    )
    audio.addEventListener('waiting', () => this.setState({ status: 'loading' }))
    audio.addEventListener('playing', () => this.setState({ status: 'playing' }))
    audio.addEventListener('pause', () => this.setState({ status: 'paused' }))
    audio.addEventListener('error', () => this.setState({ status: 'error' }))
    audio.addEventListener('timeupdate', () => this.setTime(audio.currentTime))
    audio.addEventListener('ended', () => this.handleEnded())

    this.audio = audio
    this.registerMediaSession()
  }

  /* ---- internals ------------------------------------------------------- */

  private handleEnded() {
    if (!this.queue) return
    const position = nextPosition(this.queue, { auto: true })
    if (position === null) {
      this.setState({ status: 'paused' })
      this.seek(0)
      return
    }
    if (position === this.queue.position) {
      this.seek(0)
      this.play()
      return
    }
    this.queue = withPosition(this.queue, position)
    this.load(true)
  }

  private load(autoplay: boolean) {
    this.attach()
    if (!this.queue || !this.audio) return

    const trackIndex = currentIndex(this.queue)
    const track = this.tracks[trackIndex]
    this.setState({ track, trackIndex, status: 'loading', duration: 0 })
    this.setTime(0)

    this.audio.src = track.url
    if (autoplay) this.play()
    this.updateMediaMetadata()
  }

  private setState(patch: Partial<PlayerState>) {
    this.state = { ...this.state, ...patch }
    this.listeners.forEach((listener) => listener())
    this.updateMediaPlaybackState()
  }

  private setTime(time: number) {
    // timeupdate fires ~4×/s; only notify when the displayed second changes.
    if (Math.floor(time) === Math.floor(this.time) && time !== 0) {
      this.time = time
      return
    }
    this.time = time
    this.timeListeners.forEach((listener) => listener())
    this.updateMediaPosition()
  }

  private persist() {
    const { volume, muted, shuffle, repeat } = this.state
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ volume, muted, shuffle, repeat }))
    } catch {
      // Storage can be unavailable (private mode, quota); preferences just won't stick.
    }
  }

  private restore() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<
        Pick<PlayerState, 'volume' | 'muted' | 'shuffle' | 'repeat'>
      > | null
      if (!saved) return
      this.setState({
        volume:
          typeof saved.volume === 'number'
            ? Math.min(Math.max(saved.volume, 0), 1)
            : this.state.volume,
        muted: saved.muted === true,
        shuffle: saved.shuffle === true,
        repeat: saved.repeat === 'all' || saved.repeat === 'one' ? saved.repeat : 'off',
      })
    } catch {
      // Ignore corrupt or unavailable storage.
    }
  }

  /* ---- Media Session: lock screen, headphones, keyboard media keys ------ */

  private registerMediaSession() {
    if (!('mediaSession' in navigator)) return
    const session = navigator.mediaSession
    const handlers: [MediaSessionAction, MediaSessionActionHandler][] = [
      ['play', () => this.play()],
      ['pause', () => this.pause()],
      ['previoustrack', () => this.previous()],
      ['nexttrack', () => this.next()],
      ['seekto', (details) => details.seekTime !== undefined && this.seek(details.seekTime)],
      ['seekbackward', (details) => this.seekBy(-(details.seekOffset ?? 10))],
      ['seekforward', (details) => this.seekBy(details.seekOffset ?? 10)],
    ]
    for (const [action, handler] of handlers) {
      try {
        session.setActionHandler(action, handler)
      } catch {
        // Unsupported action in this browser.
      }
    }
  }

  private updateMediaMetadata() {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return
    const { track, playlist } = this.state
    if (!track || !playlist) return
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      album: playlist.title,
      artwork: [{ src: playlist.imageUrl, sizes: '1024x1024', type: 'image/jpeg' }],
    })
  }

  private updateMediaPlaybackState() {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return
    const { status, track } = this.state
    navigator.mediaSession.playbackState = !track ? 'none' : status === 'playing' ? 'playing' : 'paused'
  }

  private updateMediaPosition() {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return
    const duration = this.state.duration
    if (!duration) return
    try {
      navigator.mediaSession.setPositionState({
        duration,
        position: Math.min(this.time, duration),
        playbackRate: 1,
      })
    } catch {
      // Some browsers reject position updates while metadata is loading.
    }
  }
}

export const player = new Player()
