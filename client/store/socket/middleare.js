import createSocket from './createSocket'

const socketMiddleware = storeAPI => {
  let socket
  //let socketTwo = createSocket('/test')

  return next => action => {
    switch (action.type) {
      case 'SEND_USER':
        socket = createSocket('', storeAPI)
        socket.sendUser(storeAPI.getState().user.id)
        break
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
