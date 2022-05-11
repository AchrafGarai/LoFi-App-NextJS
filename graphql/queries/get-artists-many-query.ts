import { gql } from '@apollo/client'

const getTopArtists = gql`
  query GetArtists {
    Artists {
      id
      name
    }
  }
`
export default getTopArtists
