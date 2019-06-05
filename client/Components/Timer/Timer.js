import React, { useState, useEffect } from 'react'

const Timer = ({ minutes }) => {
  console.log('minutes on props', minutes)
  const initializeSeconds = 59
  //let [remainingMinutes, setRemainingMinutes] = useState(minutes)
  const [remainingSeconds, setRemainingSeconds] = useState(initializeSeconds)
  //console.log('minutes on state', remainingMinutes)
  //   if (minutes) {
  //     setRemainingMinutes(remainingMinutes - 1)
  //   }
  useEffect(() => {
    let [remainingMinutes, setRemainingMinutes] = useState(minutes)
    setTimeout(() => {
      console.log('remaining minutes', remainingMinutes)
      setRemainingSeconds(remainingSeconds - 1)
      if (remainingSeconds === 1 && remainingMinutes > 0) {
        setRemainingSeconds(initializeSeconds)
      }
      if (remainingSeconds === 1 && remainingMinutes === 0) {
        clearTimeout()
      }
    }, 1000)
  })
  return <div>{remainingSeconds}</div>
}

export default Timer
