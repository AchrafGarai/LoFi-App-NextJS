import { artists } from "@components/Playlist/data/data"
import ArtistCard from "../ArtistCard"
import cn from 'clsx'
import s from './ArtistList.module.css'

function ArtistList() {
  return (
    <div className={cn(s.root)}>
          {artists.map((artist, i) => (
            <ArtistCard 
            key={artist.id}
            name = {artist.name}
            id = {artist.id}
            imgUrl =  {artist.thumbnail}
            /> 
          ))}
    </div>
  )
}

export default ArtistList