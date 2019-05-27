import React from 'react'

const StretchList = ({ stretches }) => {
  return (
    <div>
      <ul>
        {stretches.map(stretch => (
          <li>{stretch.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default StretchList
