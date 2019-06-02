import React from 'react'
import Slider from '@material-ui/lab/Slider'

const DifficultySlider = props => {
  const { difficulty, min, max, step } = props
  if (!difficulty) return null

  return (
    <Slider
      name="difficulty"
      value={difficulty}
      min={min}
      max={max}
      step={step}
    />
  )
}

DifficultySlider.defaultProps = {
  min: 1,
  max: 5,
  step: 1
}

export default DifficultySlider
