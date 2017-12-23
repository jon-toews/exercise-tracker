import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import auth from '../utils/auth';

import styled from 'styled-components'


class Navigation extends Component {
  render() {
    const authStatus = auth.isUserAuthenticated();
    console.log('rending nav. Auth: ', authStatus)

    return (
      <Nav>
        <NavItems>
          <li><NavLinkBrand to="/">Lift Logger</NavLinkBrand></li>
          <li><NavLink to="/lifts">Lifts</NavLink></li>
          {authStatus ? null : <li><NavLink to="/register">Register</NavLink></li>}
          {authStatus ? 
            <li><NavLink to="/" onClick={() => {auth.deauthenticateUser()}}> Logout </NavLink></li>:
            <li><NavLink to="/login">Login</NavLink></li>
          }
        </NavItems>
      </Nav>
    );
  }
}

const Nav = styled.nav`
  grid-area: header;
  background: #3f50b5;
  color: #fafafa;
  box-shadow: 0px 2px 2px rgba(0,0,0,.2);
  border-bottom: #2b3fb1 1px solid;
`

const NavItems = styled.ul`
  display:flex;
  padding: 0 10px;
  margin: 0;
  list-style: none;
  align-items: baseline;

  & > li:first-child {
    margin-right: auto
  }
`

const NavLink = styled(Link)`
  box-sizing: border-box;
  padding: 10px 12px;
  display: block;
  border-bottom: 4px solid transparent;
  color: inherit;
  cursor: pointer;
  font-weight:400;
  font-size:14px;

  &:hover,
  &:active,
  &:focus {
    color: inherit;
    text-decoration: none;
    border-bottom: 4px solid #fff;
  }
`

const NavLinkBrand = NavLink.extend`
  font-size: 16;
  &:hover,
  &:active,
  &:focus {
    border-bottom: 4px solid transparent;
  }
`



export default Navigation;
