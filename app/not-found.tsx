import { ButtonLink } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-6 py-24 text-center">
      <h1 className="text-2xl font-medium">This playlist doesn’t exist</h1>
      <ButtonLink href="/">Back to playlists</ButtonLink>
    </div>
  )
}
