import React, { useEffect } from 'react'

import moment from 'moment'
import Typography from '@material-ui/core/Typography'

const Timer = ({
  minutesForStretch,
  timeStretchStarted,
  totalSecondsLeft,
  setTotalSecondsLeft,
  answeringWhenStretchOpen,
  action,
  args
}) => {
  useEffect(() => {
    if (minutesForStretch) {
      if (totalSecondsLeft > 0) {
        setTimeout(() => {
          let newTotalSecondsLeft = answeringWhenStretchOpen
            ? minutesForStretch * 60 -
              moment
                .utc(new Date())
                .local()
                .diff(moment.utc(timeStretchStarted).local(), 'seconds')
            : totalSecondsLeft - 1
          setTotalSecondsLeft(newTotalSecondsLeft)
        }, 1000)
      } else if (totalSecondsLeft === 0 && action) {
        action(...args)
      }
    }
  })

  const minutesLeft = Math.floor(totalSecondsLeft / 60)
  const secondsInMinutesLeft = totalSecondsLeft - minutesLeft * 60
  return (
    <Typography variant="body2" component="p">
      {minutesLeft}:{' '}
      {secondsInMinutesLeft < 10
        ? `0${secondsInMinutesLeft}`
        : `${secondsInMinutesLeft}`}
    </Typography>
  )
}

export default Timer
