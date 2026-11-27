import Image from 'next/image'
import { GithubIcon } from '@/components/icons'
import { REPO_URL } from '@/components/navigation'
import { PlaylistCard } from '@/components/playlist/playlist-card'
import { featuredArtists, playlists } from '@/data/catalog'

export default function HomePage() {
  return (
    <div className="grid gap-12 md:grid-cols-[2fr_1fr] md:gap-16">
      <section aria-labelledby="playlists-heading">
        <h1 id="playlists-heading" className="mb-6 text-2xl font-medium">
          Playlists
        </h1>
        <div className="flex flex-col gap-16">
          {playlists.map((playlist, index) => (
            <PlaylistCard key={playlist.slug} playlist={playlist} eager={index === 0} />
          ))}
        </div>
      </section>

      <aside className="flex flex-col gap-10">
        <section aria-labelledby="artists-heading" className="flex flex-col gap-4">
          <h2 id="artists-heading" className="text-xl font-medium">
            Featured artists
          </h2>
          <ul className="flex flex-col gap-4">
            {featuredArtists.map((artist) => (
              <li key={artist.id} className="flex items-center gap-3">
                <Image
                  src={artist.imageUrl}
                  alt=""
                  width={56}
                  height={56}
                  className="size-14 rounded-xl object-cover"
                />
                <span className="font-medium">{artist.name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border-2 border-raised p-5">
          <h2 className="text-lg font-medium">About this project</h2>
          <p className="text-sm text-muted">
            A music player built with Next.js and React. Playback runs in a small external store with
            shuffle, repeat, keyboard shortcuts and lock-screen controls.
          </p>
          <p className="text-sm text-muted">
            Shortcuts: <kbd>Space</kbd> play/pause, <kbd>←</kbd>/<kbd>→</kbd> seek,{' '}
            <kbd>Shift</kbd>+<kbd>←</kbd>/<kbd>→</kbd> previous/next, <kbd>M</kbd> mute.
          </p>
          <a
            href={REPO_URL}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-raised px-4 py-2.5 text-sm hover:brightness-125"
          >
            <GithubIcon size={20} /> View the code
          </a>
        </section>
      </aside>
    </div>
  )
}
