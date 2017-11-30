import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import fakeAuth from './auth';
import TextField from './TextField';
import Layout from './Layout';
import axios from 'axios';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      user: {
        username: '',
        password: ''
      },
      errors: {}
    }
  }

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const user = {...this.state.user}
    user[name] = target.value;

    this.setState({
      user
    });
  };

  login = (e) => {
    e.preventDefault()
    console.log("username: ", this.state.user.username);
    console.log("password: ", this.state.user.password);

    axios
      .post('/login', this.state.user)
      .then(response => {
        console.log("login:", response);
        // set auth token
        localStorage.setItem('token', response.data.token);
        this.setState({ 
          errors: {},
          redirectToReferrer: true
        });
      })
      .catch(error => {
        console.log("login error:", error.response);
        if(error.response.status === 401) {
          this.setState({ errors: { summary: "Invalid username or password"}})
          return;
        }
        this.setState({
          errors: error.response.data.errors
        });
      });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' }};
    const { redirectToReferrer } = this.state;
    
    if (redirectToReferrer === true) {
      console.log("redirecting", from);
      return <Redirect to={from} />
    }
    
    const errors = this.state.errors;

    return (
      <Layout>
        <form className="form register-form" onSubmit={this.login}>
          {errors.summary ? 
            <p className="error-message">{errors.summary}</p> :
            null
          }
          <TextField 
            label="Username"
            name="username"
            value={this.state.user.username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <TextField 
            label="Password"
            name="password"
            type="password"
            value={this.state.user.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary" type="submit" name="submit">Login</button>
        </form>
      </Layout>
    )
  }
}

export default Login;
