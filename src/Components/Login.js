import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import withAuth from '../HOC/withAuth'
 class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  handlePassword = (e) => {
    let value = e.target.value
    this.setState({
      password: value
    })
  }

  handleUsername = (e) => {
    let value = e.target.value
    this.setState({
      username: value
    })
  }



  handleLogin = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      "method": "POST",
      "body": JSON.stringify({user: {username: this.state.username, password: this.state.password}}),
      "headers": {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      }
    })
    .then(r => r.json())
    .then(resp => {
      this.props.handleLoginUser(resp)
      localStorage.setItem('token', resp.jwt)

    })

  }



  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/profile" />
    } else {
    return (
      <div className="loginPage">
      <div className="loginDiv row">
          <h3>Login</h3>
        <form onSubmit={this.handleLogin} className="col s12 form">
          <div className="row">
            <div className="input-field col s6">
              <input onChange={this.handleUsername} value={this.state.username} placeholder="Username" id="first_name" type="text" className="validate"/>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input onChange={this.handlePassword} value={this.state.password} placeholder="Password" id="password" type="password" className="validate"/>
            </div>
          </div>
        <div className="row loginButton">
          <button type="submit" className="btn btn-large pink pulse">LOGIN</button>
        </div>
        </form>
      </div>
    </div>
    )
  }
  }
}

export default Login
