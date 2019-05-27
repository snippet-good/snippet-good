import createSocket from './createSocket'

const socketMiddleware = storeAPI => {
  let socket = createSocket()
  //let socketTwo = createSocket('/test')

  socket.on('connect', () => {
    console.log('two-way connection established')
  })

  socket.on('GETTING_DRAW', () => {
    console.log('in gertting draw')
    storeAPI.dispatch({ type: 'GET_USER', user: { name: 'Joe' } })
  })

  return next => action => {
    switch (action.type) {
      case 'SENDING_DRAW':
        console.log('in sending draw')
        socket.sendDraw()
        return
      default:
        break
    }

    return next(action)
  }
}

export default socketMiddleware
