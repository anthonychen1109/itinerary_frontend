import React, { Component } from 'react';
import withAuth from '../HOC/withAuth'
import { Link } from 'react-router-dom'

class Profile extends Component {


  state = {
    user: '',
    trips: [],
    avatar: ''
  }


  componentDidMount() {
    fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
    .then(r => r.json())
    .then(resp =>
      this.setState({
        user: resp.username,
        trips: resp.trips,
        avatar: resp.avatar_url
      })
    )
  }



  render() {
    return (

      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className="card-panel grey lighten-5 z-depth-1">
          <div className="row valign-wrapper">
            <div className="col s2">
              <img src={this.state.avatar} alt="icon" className="circle responsive-img"/>
            </div>
            <div className="col s10">
              <span className="black-text">
                Welcome {this.state.user}, to your travel archive!
              </span>
            </div>
          </div>
        </div>
        <Link className="waves-effect waves-red btn-flat" to='/map'>Create A Trip</Link>
        <br />
        <p>{this.state.user}'s trips</p>
      </div>
    )
  }
}

export default withAuth(Profile)
