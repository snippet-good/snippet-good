import React, { useState, useEffect } from 'react'

const Timer = ({ minutes }) => {
  const initializeSeconds = 59
  let [remainingMinutes, setRemainingMinutes] = useState(minutes)
  const [remainingSeconds, setRemainingSeconds] = useState(initializeSeconds)
  if (minutes) {
    remainingMinutes = remainingMinutes - 1
  }
  useEffect(() => {
    setTimeout(() => {
      setRemainingSeconds(remainingSeconds - 1)
      if (remainingSeconds === 55 && minutes > 0) {
        setRemainingSeconds(initializeSeconds)
      }
      if (remainingSeconds === 1 && minutes === 0) {
        clearTimeout()
      }
    }, 1000)
  })
  return (
    <div>
      {minutes}: {remainingSeconds}
    </div>
  )
}

export default Timer
