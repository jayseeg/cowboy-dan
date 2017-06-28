import {
  CONNECT,
  SEND_CHAT_MESSAGE,
  CONNECTING,
  CONNECTED,
  DISCONNECTED,
  DISCONNECT,
  MESSAGE_RECEIVED,
} from '../../lib/socketMiddleware'
export const PONG = 'blockchainWebsocket/PONG'
export const DROP_UPDATED_ADDRESSES = 'blockchainWebsocket/DROP_UPDATED_ADDRESSES'

const initialState = {
  coinsReceived: null,
  connected: false,
  connecting: false,
  updatedAddressIDs: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CONNECTED:
      return {
        ...state,
        connected: true,
        connecting: false,
      }

    case CONNECTING:
      return {
        ...state,
        connecting: true,
      }

    case DISCONNECTED:
      return {
        ...state,
        connected: false,
      }

    case MESSAGE_RECEIVED:
      const addresses = action.message.x.out
      const updatedAddressIDs = addresses.map(address => address.addr)

      return {
        ...state,
        updatedAddressIDs,
      }

    case DROP_UPDATED_ADDRESSES:
      return {
        ...state,
        updatedAddressIDs: [],
      }

    default:
      return state
  }
}

export const connect = () => ({
  type: CONNECT,
  url: 'wss://ws.blockchain.info/inv',
})

export const subscribeAddressIDs = addressIDs => dispatch => {
  addressIDs.forEach(addressID => {
    dispatch({
      type: SEND_CHAT_MESSAGE,
      message: {
        op: 'addr_sub',
        addr: addressID,
      },
    })
  })
}

export const connecting = () => ({
  type: CONNECTING,
  status: 'connecting',
})

export const connected = () => dispatch => {
  dispatch({
    type: CONNECTED,
    status: 'connected',
  })

  setTimeout(() => dispatch(ping()), 30000)
  setTimeout(() => dispatch(ping()), 60000)
  setTimeout(() => dispatch(ping()), 90000)
  setTimeout(() => dispatch(disconnect()), 120000)
}

export const disconnect = () => ({
  type: DISCONNECT,
  status: 'disconnect',
})

export const disconnected = () => ({
  type: DISCONNECTED,
  status: 'disconnected',
})

export const messageReceived = message => ({
  type: MESSAGE_RECEIVED,
  status: 'messageReceived',
  message,
})

export const ping = () => ({
  type: SEND_CHAT_MESSAGE,
  message: {
    op: 'ping',
  },
})

export const pong = message => ({
  type: PONG,
  message,
})

export const dropUpdatedAddressIDs = () => ({
  type: DROP_UPDATED_ADDRESSES,
})

export const socketActions = {
  connect,
  connecting,
  connected,
  disconnected,
  messageReceived,
  ping,
  pong,
}

export const messageTypes = {
  utx: (store, socketActions, message) => {
    store.dispatch(socketActions.messageReceived(message))
  },
  pong: (store, socketActions, message) => {
    store.dispatch(socketActions.pong(message))
  },
}
