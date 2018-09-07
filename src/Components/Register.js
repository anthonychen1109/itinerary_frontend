import React, { Component } from 'react';

export default class Register extends Component {


  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.props.username, this.props.password)
  }




  render() {
    return (
      <div className="row">
          <h3>Sign Up</h3>
        <form onSubmit={this.handleSubmit}  className="col s12 form">
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
          <button type="submit" className="btn btn-large pink pulse">Sign Up</button>
        </div>
        </form>
      </div>
    )
  }
}
