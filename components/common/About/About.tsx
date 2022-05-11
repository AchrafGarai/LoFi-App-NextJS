import cn from 'clsx'
import s from './About.module.css'
import { GithubIcon } from '@components/Icons'
import { Button } from '@components/UI'
import Link from 'next/link'

function About() {
  return (
    <div className={cn(s.root)}>
      <h2 className={cn(s.title)}>Get the code</h2>
      <p className={cn(s.text)}>
        Lo-Fi is a simple music streaming app developed using NextJs.
      </p>
      <Link href="https://github.com/AchrafGarai/Lofi-App-front-end">
        <Button variant="ghost">
          <GithubIcon></GithubIcon>
          Get the code on Github
        </Button>
      </Link>
    </div>
  )
}

export default About
