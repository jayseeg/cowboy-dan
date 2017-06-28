import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'

import store, {history} from './store'
import App from './containers/app/App'
import './fonts.css'
import './index.css'

const target = document.querySelector('#root')

render(
  <Provider {...{store}}>
    <ConnectedRouter {...{history}}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
