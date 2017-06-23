import React, {Component} from 'react'
import {
  Route,
  Link,
} from 'react-router-dom'
import Home from '../home'
import About from '../about'

import logo from '../../logo.svg'
import '../../App.css'

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to React</h2>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
        </header>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <main>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
        </main>
      </div>
    )
  }
}
