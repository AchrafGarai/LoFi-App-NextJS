import { gql } from '@apollo/client'

const getPlaylistQuery = gql`
  query Playlist($playlistId: String!) {
    playlist(id: $playlistId) {
      id
      title
      imageUrl
      tracks {
        id
        title
        url
        artist {
          name
        }
      }
    }
  }
`
export default getPlaylistQuery
