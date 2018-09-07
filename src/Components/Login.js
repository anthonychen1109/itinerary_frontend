import React, { Component } from 'react';

export default class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  handleUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handlePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
  }

  handleLogin = () => {
    //fetch to backend and login 

  }



  render() {
    return (
      <center>
      <div className="row">
          <h3>Login</h3>
        <form onSubmit={this.onSubmit} className="col s12 form">
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
        <div className="row">
          <button type="submit" className="btn btn-large red pulse">LOGIN</button>
        </div>
        </form>
      </div>
      </center>
    )
  }
}
