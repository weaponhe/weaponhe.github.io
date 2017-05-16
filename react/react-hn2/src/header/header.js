import React from 'react'
import {NavLink} from 'react-router-dom'
import Settings from '../settings/settings'
import './header.css'
export default class Header extends React.Component {
  state = {showSettings: false}
  toggleSettings = () => {

  }

  render() {
    return (
      <header>
        <NavLink to="/top" className="logo"><img src="img/logo.png" alt="logo"/></NavLink>
        <NavLink to="/top" className="title" activeClassName="active">React HN</NavLink>
        <nav>
          <NavLink to="/new" activeClassName="active">new</NavLink>
          <NavLink to="/show" activeClassName="active">show</NavLink>
          <NavLink to="/ask" activeClassName="active">ask</NavLink>
          <NavLink to="/job" activeClassName="active">job</NavLink>
        </nav>
        <a className="settings" onClick={this.toggleSettings}>
          {this.state.showSettings ? 'hide settings' : 'settings'}
        </a>
        {this.state.showSettings && <Settings/>}
      </header>
    )
  }
}