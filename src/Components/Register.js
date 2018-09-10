import React, { Component } from 'react';

export default class Register extends Component {




  handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/users', {
      method: "POST",
      body: JSON.stringify({user: {
        username: this.props.username,
        password: this.props.password,
        avatar_url: this.props.avatar_url
      }}),
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      }
    })

  }




  render() {
    return (
      <div className="registerPage">
        <form onSubmit={this.handleSubmit}  className="registerForm col s12 form">
          <div className="signUpHeader">
            <h3>Sign Up</h3>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input onChange={this.props.handleUsername} value={this.props.username} placeholder=" Create Username" id="first_name" type="text" className="validate"/>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input onChange={this.props.handlePassword} value={this.props.password} placeholder=" Create Password" id="password" type="password" className="validate"/>
            </div>
          </div>
          <div className="row">
          <div className="input-field col s6">

          <input
          onChange={this.props.handleAvatar}
          placeholder="Avatar"
          value={this.props.avatar_url}
          className="validate"
          type="text"/>
          </div>
          </div>
        <div className="registerSubmitButton row">
          <button type="submit" className="btn btn-large pink pulse">Sign Up</button>
        </div>
        </form>
      </div>
    )
  }
}
