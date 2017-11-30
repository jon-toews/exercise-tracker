import React, { Component } from 'react';
import Navigation from './Nav.js';
import './Layout.css';

class Layout extends Component {
  render() {
    return (
      <div className="wrapper">
        <Navigation />
        { this.props.children }
      </div>
    )
  }
}


export default Layout;