import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Home from '../home'

import {fetchTicker} from '../../modules/blockchain'
import {saveUrl} from '../../modules/addresses'
import {composeEnterHooksParallel} from '../../lib/reactRouterComposeHooks'
import './App.css'

injectTapEventPlugin()

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className='App'>
          <main>
            <Route
              path='/'
              component={Home}
              onEnter={composeEnterHooksParallel([
                this.props.fetchTicker(),
                this.props.saveUrl(),
              ])}
            />
          </main>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTicker,
  saveUrl,
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(App)
