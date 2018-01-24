import { Provider } from 'react-redux'
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import LiftApp from 'components/LiftApp'
import Register from 'containers/Register';
import Login from 'containers/Login';
import auth from 'utils/auth';
import Navigation from 'components/Nav';

import  '../bootstrap.css'


const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact={true} path="/" component={Welcome} /> 
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />

        <PrivateRoute path="/lifts/type/:filter" component={LiftApp} />
        <PrivateRoute path="/lifts/" component={LiftApp}  />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  </Provider>
)

export default Root

// TODO move stuff below to separate files
const Welcome = () => {
  return (
    <div>
      <Navigation />
      <h1>Welcome to Lift Logger</h1>
    </div>
  )
}

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
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