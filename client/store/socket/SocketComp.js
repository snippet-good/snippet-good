import React from 'react'
import store from '../store'

const SocketComp = ({ history }) => {
  return (
    <h3
      onClick={() => {
        store.dispatch({ type: 'SENDING_DRAW' })
        history.push('/')
      }}
    >
      Click Me
    </h3>
  )
}

export default SocketComp
