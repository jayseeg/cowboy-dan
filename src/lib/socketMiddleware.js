export const CONNECT = 'socketMiddleware/CONNECT'
export const DISCONNECT = 'socketMiddleware/DISCONNECT'
export const SEND_CHAT_MESSAGE = 'socketMiddleware/SEND_CHAT_MESSAGE'
export const CONNECTING = 'socketMiddleware/CONNECTING'
export const CONNECTED = 'socketMiddleware/CONNECTED'
export const DISCONNECTED = 'socketMiddleware/DISCONNECTED'
export const MESSAGE_RECEIVED = 'socketMiddleware/MESSAGE_RECEIVED'

// hat tip to https://exec64.co.uk/blog/websockets_with_redux/ where I stole this from
export default (typeKey = 'type', socketActions = {}, messageTypes = {}) => {
  let socket = null

  const onOpen = (ws, store, token) => evt => {
    store.dispatch(socketActions.connected())
  }

  const onClose = (ws, store) => evt => {
    store.dispatch(socketActions.disconnected())
  }

  const generateOnMessageHandler = typeKey => (ws, store) => evt => {
    const message = JSON.parse(evt.data)
    const type = message[typeKey]

    if (messageTypes.hasOwnProperty(type)) {
      messageTypes[type](store, socketActions, message)
    } else {
      console.error(`Received unknown message type: '${type}'`)
    }
  }

  const onMessage = generateOnMessageHandler(typeKey)

  return store => next => action => {
    switch(action.type) {
      case CONNECT:
        if (socket !== null) socket.close()
        store.dispatch(socketActions.connecting())

        socket = new WebSocket(action.url)
        socket.onmessage = onMessage(socket, store)
        socket.onclose = onClose(socket, store)
        socket.onopen = onOpen(socket, store, action.token)

        break

      case DISCONNECT:
        if(socket !== null) socket.close()
        socket = null

        store.dispatch(socketActions.disconnected())
        break

      case SEND_CHAT_MESSAGE:
        if (socket === null) {
          store.dispatch(socketActions.connect())
          // quick & dirty "give it a second & try again"
          // problematic for slow connections, could overflow?
          setTimeout(() => socket.send(JSON.stringify(action.message)), 1000)
        } else {
          socket.send(JSON.stringify(action.message))
        }

        break

      default:
        return next(action)
    }
  }
}
