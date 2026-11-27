import Link from 'next/link'
import { GithubIcon } from './icons'
import { Logo } from './logo'
import { ThemeMenu } from './theme-menu'

const REPO_URL = 'https://github.com/AchrafGarai/LoFi-App-NextJS'

export function Navigation() {
  return (
    <header className="mb-6 border-b border-raised md:mb-12">
      <nav className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 md:px-6" aria-label="Main">
        <Link href="/" className="mr-auto rounded-md" aria-label="Lo-Fi home">
          <Logo className="h-7 w-auto" />
        </Link>
        <a
          href={REPO_URL}
          className="rounded-full p-2 hover:bg-raised"
          aria-label="Source code on GitHub"
        >
          <GithubIcon />
        </a>
        <ThemeMenu />
      </nav>
    </header>
  )
}

export { REPO_URL }
