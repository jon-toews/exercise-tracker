import React, { Component } from 'react';
import './bootstrap.css';
import TextField from './TextField';
import Navigation from './Nav';
import axios from 'axios';


export default class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        username: null,
        email: null,
        password: null,
        confirm: null,
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

  handleRegisterSubmit = event => {
    event.preventDefault();
    

      axios.post('/register', this.state.user)
      .then(response => {
        if(response.status === 200) {
          console.log("register OK", response);
          this.setState({ errors: {} })
        }
        console.log(response);
      })
      .catch(error => {
        console.log("register error: ", error.response.data.errors);
        this.setState({ errors: error.response.data.errors })
      });
    }

  render() {
    const errors = this.state.errors;

    {errors.summary && <p className="error-message">{errors.summary}</p>}

    return (
      <div className="wrapper">
        <Navigation />
        <form className="form register-form" onSubmit={this.handleSubmit}>
          <TextField 
            label="Username"
            name="username"
            value={this.state.user.username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <TextField 
            label="Email"
            name="email"
            type="email"
            value={this.state.user.email}
            onChange={this.handleChange}
            error={errors.email}
          />
          <TextField 
            label="Password"
            name="password"
            type="password"
            value={this.state.user.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <TextField 
            label="Confirm Password"
            name="confirm"
            type="password"
            value={this.state.user.confirm}
            onChange={this.handleChange}
            error={errors.confirm}
          />
          <button className="btn btn-primary" type="submit" name="submit" onClick={this.handleRegisterSubmit}>Register</button>
        </form>
      </div>
    );
  }
}
