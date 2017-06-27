import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Home from '../home'

import {fetchTicker} from '../../modules/blockchain'
import '../../App.css'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <main>
          <Route
            exact
            path='/'
            component={Home}
            onEnter={this.props.fetchTicker()}
          />
        </main>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({fetchTicker}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(App)
