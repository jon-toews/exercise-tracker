import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LiftContainer from 'containers/LiftContainer';
import Register from 'containers/Register';
import Login from 'containers/Login';
import auth from 'utils/auth';
import axios from 'axios';

import Navigation from 'components/Nav';


class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      username: ''
    }
  }
  componentWillMount() {
    if(!auth.isAuthenticated) return;

    axios.get('/user', { headers: {
      authorization: `Bearer ${auth.getToken}`
    }})
    .then(response => {
      console.log('authorized!', response);
      this.setState({
        username: response.data.username
      })
    })
  }

  componentDidUpdate() {
    console.log('app component did update');
  }

  render() {
    console.log("Rendering App", this.state);
    return (
      <Router>
          <Switch>
            <Route exact={true} path="/" component={Welcome} /> 
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />

            <PrivateRoute path="/lifts/:type" component={LiftContainer} />
            <PrivateRoute path="/lifts/" component={LiftContainer} />
            <Route component={NoMatch} />
          </Switch>
      </Router>
    );
  }
}

const Welcome = () => {
  return (
    <div>
      <Navigation />
      <h1>Welcome to Lift Logger</h1>
    </div>
  )
}

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  console.log("Private Route", rest);
  return(
    <Route {...rest} render={props => (
      auth.isUserAuthenticated() ? (
        <Component username={rest.username} {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )
}

const NoMatch = () => <h3>404 page not found</h3>



export default App;
