import s from "./ArtistCard.module.css"
import cn from 'clsx'
import Image from "next/image"


export interface props  {
  name : string 
  imgUrl : string
  id: string
  className?: string

}

const ArtistCard : React.FC<props> = (props) => {
  const {
    name,
    imgUrl,
    id,
    className,
    children,
    ...rest
  } = props


  return (
            <div className={cn(s.root)}>
              <Image 
                    className="rounded-md"
                    height='64' 
                    width='64' 
                    src={imgUrl} 
              />
                <div className='flex flex-row gap-4'>
                    <h1 className={cn(s.title)} >{name}</h1>
                    {children}
                </div>
            </div>
  )
}

export default ArtistCard