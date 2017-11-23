import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

import './Navigation.css'
import fakeAuth from './auth';



class Navigation extends Component {
  render() {
    return (
      <nav className="nav">
        <div className="nav-container">
          
          <ul className="nav__items">
            <li className="nav__brand"><Link className="nav__link--brand" to="/">Lift Logger</Link></li>
            <li><Link className="nav__link" to="/lifts">Lifts</Link></li>
            <li><Link className="nav__link" to="/login">Login</Link></li>
            <li><Link className="nav__link" to="/register">Register</Link></li>
          </ul>
    
        </div>
      </nav>
    );
  }
}

const AuthButton = withRouter(({ history }) => {
  return (
      fakeAuth.isAuthenticated ? (
          <button className="btn btn-logout" onClick={() => {fakeAuth.signout(() => history.push('/'))}}>Logout</button>
      ) : (
        <ul classname="nav__items nav__user">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
        )   
  )
})


export default Navigation;
