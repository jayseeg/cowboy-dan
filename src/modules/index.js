import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import blockchain from './blockchain'
import wallet from './wallet'
import blockchainWebsocket from './blockchainWebsocket'

export default combineReducers({
  routing: routerReducer,
  blockchain,
  wallet,
  blockchainWebsocket,
})
