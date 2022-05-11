import { usePlayerState } from '@lib/player';
import React from 'react'
import cn from 'clsx' 
import s from './PlayingIcon.module.css'

function Playing() {

  const state = usePlayerState();

  return (
    <>  
     {state.playing ? (
        <div  className={cn(s.root)}>
            <div className={cn(s.bar,s.b1)}/>
            <div className={cn(s.bar,s.b2)}/>
            <div className={cn(s.bar,s.b3)}/>
            <div className={cn(s.bar,s.b1)}/>
        </div>
      ) : (
        <div  className={cn(s.root)} ></div>
      )}

    </>
  )
}

export default Playing