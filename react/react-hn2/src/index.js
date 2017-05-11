import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Header from './header/header'

ReactDOM.render((
  <Router>
    <Header/>
  </Router>
), document.getElementById('root'))