import Image from 'next/image'
import Link from 'next/link'
import type { CatalogPlaylist } from '@/data/catalog'
import { PlayPlaylistButton } from './play-playlist-button'

export function PlaylistCard({
  playlist,
  eager,
}: {
  playlist: CatalogPlaylist
  /** Load immediately: set for the first, above-the-fold card. */
  eager?: boolean
}) {
  return (
    <article className="flex flex-col gap-5">
      <Link href={`/playlist/${playlist.slug}`} className="group overflow-hidden rounded-3xl">
        <Image
          src={playlist.imageUrl}
          alt=""
          width={1024}
          height={1024}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          sizes="(min-width: 768px) 600px, 100vw"
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
        />
      </Link>
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <h2 className="text-center text-2xl font-medium tracking-tight md:max-w-sm md:text-left md:text-3xl">
          <Link href={`/playlist/${playlist.slug}`} className="hover:underline">
            {playlist.title}
          </Link>
        </h2>
        <PlayPlaylistButton playlist={playlist} />
      </div>
      <p className="text-center text-sm text-muted md:text-left">
        {playlist.tracks.length} tracks
      </p>
    </article>
  )
}
