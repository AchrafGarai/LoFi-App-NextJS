import { Playlist } from '@lib/player/types'
import PlaylistView from '@components/Playlist/PlaylistView'
import { getAllPlaylistsQuery, getPlaylistQuery } from '@graphql/queries'
import { GetStaticPropsContext } from 'next'
import { client } from '@lib/apollo'

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const slug = params?.slug
  const { data } = await client.query({
    query: getPlaylistQuery,
    variables: {
      playlistId: slug,
    },
  })

  return {
    props: {
      data,
    },
  }
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: getAllPlaylistsQuery,
  })
  const paths = data.playlists.map((playlist: any) => ({
    params: { slug: playlist.id },
  }))
  return { paths, fallback: false }
}

const Playlist = (props: { playlist: Playlist; data: any }) => {
  const { playlist, data, ...rest } = props

  return (
    <>
      <PlaylistView playlist={data.playlist}></PlaylistView>
    </>
  )
}

export default Playlist
