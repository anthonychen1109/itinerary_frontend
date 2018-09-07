import React, { Component } from 'react';

export default class Login extends Component {





  handleLogin = () => {
    //fetch to backend and login

  }



  render() {
    console.log(this.props)
    return (
      <div className="loginPage">
      <div className="loginDiv row">
          <h3>Login</h3>
        <form className="col s12 form">
          <div className="row">
            <div className="input-field col s6">
              <input onChange={this.props.handleUsername} value={this.props.username} placeholder="Username" id="first_name" type="text" className="validate"/>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input onChange={this.props.handlePassword} value={this.props.password} placeholder="Password" id="password" type="password" className="validate"/>
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
