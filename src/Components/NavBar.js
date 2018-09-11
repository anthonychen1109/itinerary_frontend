import React, { Component } from 'react';
import { Link } from 'react-router-dom'
export default class NavBar extends Component {







  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/">
          <img alt="logo" src={require('../logo.png')} />
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link className="waves-effect waves-teal btn-flat" to="/">Home</Link></li>
            <li><Link className="waves-effect waves-teal btn-flat" to="/login">Login</Link></li>
            <li><Link className="waves-effect waves-teal btn-flat" to="/register">Register</Link></li>
            <li><Link className="waves-effect waves-teal btn-flat" to="/profile">Profile</Link></li>
            <li><Link className="waves-effect waves-teal btn-flat" to="/newTrip">Create Trip</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
}
