import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import App from './App'
// import Spinner from './Spinner/Spinner'
ReactDOM.render((
  <Router>
    <div>
      <App/>
      {/*<Spinner size={6} spacing={2}/>*/}
    </div>
  </Router>
), document.getElementById('root'))