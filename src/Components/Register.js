import React, { Component } from 'react';

export default class Register extends Component {

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

  render() {
    return (
      <div className="row">
          <h3>Sign Up</h3>
        <form onSubmit={this.onSubmit} className="col s12 form">
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
          <button type="submit" className="btn btn-large red pulse">Sign Up</button>
        </div>
        </form>
      </div>
    )
  }
}
