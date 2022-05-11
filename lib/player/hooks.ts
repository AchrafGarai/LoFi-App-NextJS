import { useState, useEffect } from 'react'

import player from './player'

export const usePlayerState = () => {
  const [state, setState] = useState(player.getState())

  useEffect(() => {
    const unsubscribe = player.subscribe(setState)

    return unsubscribe
  }, [])

  return state
}

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(player.getCurrentTime())

  useEffect(() => {
    const unsubscribe = player.onChangeCurrentTime(setCurrentTime)

    return unsubscribe
  }, [])

  return currentTime
}
