import React from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group';
import {CheckIcon} from '../../Icons'
import cn from 'clsx'
import s from './RadioItem.module.css'

interface props {
 value : string
 variant?: 'white' | 'dark' | 'blue' | 'black' | 'violet' | 'pink' | 'spotify'
}


const  RadioItem : React.FC<props> = (props) => { 
    const {
        value,
        variant = 'default',
        ...rest
      } = props
  
  
    const rootClassName = cn(
      s.root,
      {
        [s.dark]: variant === 'dark',
        [s.white]: variant === 'white',
        [s.blue]: variant === 'blue',
        [s.black]: variant === 'black',
        [s.violet]: variant === 'violet',
        [s.pink]: variant === 'pink',
        [s.spotify]: variant === 'spotify',
      
      }
    )
    
  return (
    <RadioGroup.Item value = {value}  className={rootClassName}  > 
        <RadioGroup.Indicator className="absolute">
            <CheckIcon></CheckIcon>
        </RadioGroup.Indicator>
        {/* {value} */}
    </RadioGroup.Item>
  )
}

export default RadioItem