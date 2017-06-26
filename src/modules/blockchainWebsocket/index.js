import {
  CONNECT,
  SEND_CHAT_MESSAGE,
  CONNECTING,
  CONNECTED,
  DISCONNECTED,
  MESSAGE_RECEIVED,
} from '../../lib/socketMiddleware'
export const PONG = 'blockchainWebsocket/PONG'

const BITCOIN_PRECISION = 100000000
const ADDR = '1BCGfVLSwjry8jWLgHaRnA1HaWLG5spnFd'

const initialState = {
  coinsReceived: null,
  connected: false,
  connecting: false,
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
      const {out} = action.payload.msg.x
      const transaction = out.find(txn => txn.addr === ADDR)
      const {value} = transaction
      const coinsReceived = value / BITCOIN_PRECISION

      return {
        ...state,
        coinsReceived,
      }

    case PONG:
      console.log(action.message.op)

      return state

    default:
      return state
  }
}

export const connect = () => ({
  type: CONNECT,
  url: 'wss://ws.blockchain.info/inv',
})

export const subscribeAddress = () => ({
  type: SEND_CHAT_MESSAGE,
  message: {
    op: 'addr_sub',
    addr: ADDR,
  },
})

export const connecting = () => ({
  type: CONNECTING,
  status: 'connecting',
})

export const connected = () => ({
  type: CONNECTED,
  status: 'connected',
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