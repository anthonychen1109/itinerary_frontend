import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
export default class Register extends Component {

  state = {
    username: '',
    password: '',
    avatar_url: ''
  }

  handleUsername = (e) => {
    let value = e.target.value
    this.setState({
      username: value
    })
  }

  handlePassword = (e) => {
    let value = e.target.value
    this.setState({
      password: value
    })
  }

  handleAvatar = (e) => {
    let value = e.target.value
    this.setState({
      avatar_url: value
    })
  }


  handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/users', {
      method: "POST",
      body: JSON.stringify({user: {
        username: this.state.username,
        password: this.state.password,
        avatar_url: this.state.avatar_url
      }}),
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      }
    })

  }




  render() {
    if (this.props.loggedIn) {
      return <Redirect to='/profile' />
    } else {
    return (
      <div className="registerPage">
        <form onSubmit={this.handleSubmit}  className="registerForm col s12 form">
          <div className="signUpHeader">
            <h3>Sign Up</h3>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input onChange={this.handleUsername} value={this.state.username} placeholder=" Create Username" id="first_name" type="text" className="validate"/>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input onChange={this.handlePassword} value={this.state.password} placeholder=" Create Password" id="password" type="password" className="validate"/>
            </div>
          </div>
          <div className="row">
          <div className="input-field col s6">

          <input
          onChange={this.handleAvatar}
          placeholder="Avatar"
          value={this.state.avatar_url}
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
}
