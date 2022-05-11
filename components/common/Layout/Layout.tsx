import React from 'react'
import s from './Layout.module.css'
import cn from 'clsx'
import Navigation from '../Navigation'
import { ThemeProvider } from 'next-themes'
import Playlist from '@components/Playlist'
import Player from '@components/Player'
import dynamic from 'next/dynamic'
import { ApolloProvider } from '@apollo/client'
import { client } from '@lib/apollo'

const AudioSetup = dynamic(() => import('@components/Audio'), { ssr: false })

{
  /* 

const Playlist = dynamic(
  () => import('../../Playlist'),
  { ssr: false }
)

const Player = dynamic(
  () => import('../../Player'),
  { ssr: false }
)


*/
}

export interface Layoutprops {
  className?: string
}

const Layout: React.FC<Layoutprops> = (props) => {
  const { className, children, ...rest } = props

  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <Navigation />
          <AudioSetup />
          <div className={cn(s.root)}>
            {children}
            {/* 
          <Playlist />
          */}
            <Player />
          </div>
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}

export default Layout
