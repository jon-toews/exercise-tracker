import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

import './Navigation.css'
import auth from './auth';



class Navigation extends Component {



  render() {
    const authStatus = auth.isUserAuthenticated();
    console.log('rending nav. Auth: ', authStatus)

    return (
      <nav className="nav">
        <div className="nav-container">
          
          <ul className="nav__items">
            <li className="nav__brand"><Link className="nav__link--brand" to="/">Lift Logger</Link></li>
            <li><Link className="nav__link" to="/lifts">Lifts</Link></li>
            {authStatus ? null : <li><Link className="nav__link" to="/register">Register</Link></li>}
            {authStatus ? 
              <li><Link className="nav__link" to="/" onClick={() => {auth.deauthenticateUser()}}> Logout </Link></li>:
              <li><Link className="nav__link" to="/login">Login</Link></li>
            }
          </ul>
          
    
        </div>
      </nav>
    );
  }
}

const LogoutButton = withRouter(({ history }) => {
  localStorage.removeItem('token');
  return <button className="btn btn-default" onClick={() => { history.push('/')}}>Logout</button>
})


export default Navigation;
