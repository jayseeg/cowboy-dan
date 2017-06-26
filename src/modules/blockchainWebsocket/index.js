import {
  CONNECT,
  SEND_CHAT_MESSAGE,
  MESSAGE_RECEIVED,
} from '../../lib/socketMiddleware'

const BITCOIN_PRECISION = 100000000
const ADDR = '1BCGfVLSwjry8jWLgHaRnA1HaWLG5spnFd'

const initialState = {
  coinsReceived: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_RECEIVED:
      const {out} = action.payload.msg.x
      const transaction = out.find(txn => txn.addr === ADDR)
      const {value} = transaction
      const coinsReceived = value / BITCOIN_PRECISION

      return {
        ...state,
        coinsReceived,
      }

    default:
      return state
  }
}

export const connectBlockchainWebsocket = () => ({
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
