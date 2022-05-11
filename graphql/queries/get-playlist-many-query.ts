import { gql } from '@apollo/client'

const getAllPlaylistsQuery = gql`
  query getPlaylistsAndArtists {
    playlists {
      id
      title
      imageUrl
    }
    Artists {
      id
      name
      imageUrl
    }
  }
`
export default getAllPlaylistsQuery
