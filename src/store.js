import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import axios from 'axios'
import {multiClientMiddleware} from 'redux-axios-middleware'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'

import socketMiddleware from './lib/socketMiddleware'
import rootReducer from './modules'

export const history = createHistory()

const clients = {
  default: {
    client: axios.create({
      baseURL: '//localhost:3003/blockchainProxy',
      responseType: 'json',
    }),
  },
  wallet: {
    client: axios.create({
      baseURL: '//localhost:3003/walletProxy',
      responseType: 'json',
    }),
  },
}

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history),
  multiClientMiddleware(clients),
  socketMiddleware(),
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

export default createStore(
  rootReducer,
  initialState,
  composedEnhancers
)
