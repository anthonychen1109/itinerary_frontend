import React, { Component } from 'react';
import withAuth from '../HOC/withAuth'

class Profile extends Component {
  render() {
    return (

      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className="card-panel grey lighten-5 z-depth-1">
          <div className="row valign-wrapper">
            <div className="col s2">
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyZpjPvw2jqwgzhiDGZknINpLQytpkT_29pzQqT88HNMaueaed' alt="icon" className="circle responsive-img"/>
            </div>
            <div className="col s10">
              <span className="black-text">
                Welcome {'user'} to your travel journal!
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Profile)
