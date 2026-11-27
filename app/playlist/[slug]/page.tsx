import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeftIcon } from '@/components/icons'
import { PlayPlaylistButton } from '@/components/playlist/play-playlist-button'
import { TrackList } from '@/components/playlist/track-list'
import { ButtonLink } from '@/components/ui/button'
import { getPlaylist, playlists } from '@/data/catalog'

export function generateStaticParams() {
  return playlists.map((playlist) => ({ slug: playlist.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/playlist/[slug]'>): Promise<Metadata> {
  const playlist = getPlaylist((await params).slug)
  if (!playlist) return {}
  return {
    title: playlist.title,
    description: `${playlist.tracks.length} tracks: ${playlist.tracks.map((track) => track.artist).join(', ')}`,
    openGraph: { images: [playlist.imageUrl] },
  }
}

export default async function PlaylistPage({ params }: PageProps<'/playlist/[slug]'>) {
  const playlist = getPlaylist((await params).slug)
  if (!playlist) notFound()

  return (
    <div className="flex flex-col gap-8">
      <ButtonLink href="/" variant="raised" className="w-fit">
        <ArrowLeftIcon size={20} /> All playlists
      </ButtonLink>

      <div className="grid gap-10 md:grid-cols-2">
        <header className="flex flex-col items-center gap-6 md:sticky md:top-6 md:self-start">
          <Image
            src={playlist.imageUrl}
            alt=""
            width={1024}
            height={1024}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 768px) 480px, 60vw"
            className="aspect-square w-3/5 rounded-3xl object-cover md:w-full"
          />
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-medium tracking-tight">{playlist.title}</h1>
            <p className="text-sm text-muted">{playlist.tracks.length} tracks</p>
          </div>
          <PlayPlaylistButton playlist={playlist} />
        </header>

        <TrackList playlist={playlist} />
      </div>
    </div>
  )
}
