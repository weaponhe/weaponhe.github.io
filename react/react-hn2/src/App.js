import React from 'react';
import {Route} from 'react-router-dom'
import './App.css'

import Header from './header/header'
import ItemsList from './ItemList/ItemList'
function generateItemsList(type) {
  return (props) => <ItemsList {...props} type={type}/>
}
let Top = generateItemsList('top')
let New = generateItemsList('new')
let Show = generateItemsList('show')
let Ask = generateItemsList('ask')
let Job = generateItemsList('job')

export default class App extends React.Component {
  componentWillUnmount() {
  }

  render() {
    return (
      <div className="app">
        <Header/>
        <Route path="/top" component={Top}/>
        <Route path="/new" component={New}/>
        <Route path="/show" component={Show}/>
        <Route path="/ask" component={Ask}/>
        <Route path="/job" component={Job}/>
      </div>
    )
  }
}


