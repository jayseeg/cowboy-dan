import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import blockchain from './blockchain'
import addresses from './addresses'
import blockchainWebsocket from './blockchainWebsocket'

export default combineReducers({
  routing: routerReducer,
  blockchain,
  addresses,
  blockchainWebsocket,
})
