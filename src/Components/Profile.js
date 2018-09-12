import React, { Component } from 'react';
import withAuth from '../HOC/withAuth'
import { Link } from 'react-router-dom'
import TripCard from './TripCard'
import WorldMap from '../Containers/WorldMap'


class Profile extends Component {

  state = {
    user: '',
    trips: [],
    avatar: '',
    edit: false,
    coordinates: []
  }

  editTrip = (trip) => {
    this.setState( prevState => ({
      edit: !prevState.edit,
      coordinates: this.getCoordinatesForCurrentTrip(trip)
    }))
  }

  deleteTrip = (trip) => {
    fetch(`http://localhost:3000/trips/${trip.id}`, {
      "method": "DELETE",
      "headers": {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      }
    })
  }


  getCoordinatesForCurrentTrip = (trip) => {
    let coords = []
     trip.locations.map(location => {
      let coord = {lat: location.lat, lng: location.lng}
      coords.push(coord)
    })
    return coords
  }

  genCards = (trips) => {
    if (trips.length > 0) {
    return trips.map(trip => {
      return <TripCard deleteTrip={this.deleteTrip} edit={this.state.edit} editTrip={this.editTrip} key={trip.trip_id} trip={trip} />
    })
  } else {
    return <p className="profileTrips"> No trips yet </p>
  }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
    .then(r => r.json())
    .then(resp =>

      this.setState({
        user: resp.username,
        trips: resp.ctrips,
        avatar: resp.avatar_url,

      })
    )
  }

  render() {
    return (
      <div className="profile col s12 m8 offset-m2">
        <div className="card-panel grey lighten-5">
          <div className="row valign-wrapper">
            <div className="col s2">
              <img src={this.state.avatar} alt="icon" className="circle responsive-img"/>
            </div>
            <div className="col s10">
                <h1 className="profileTrips">Welcome {this.state.user}, to your travel archive!</h1>
            </div>
          </div>
        </div>
        <Link className="waves-effect waves-red btn" to='/newTrip'>Create A Trip</Link>
        <br />
        <h3 className="trips-profile">Your Trips</h3>
          {this.genCards(this.state.trips)}
          {this.state.edit ?
            <WorldMap coordinates={this.state.coordinates}/> :
            null
          }
      </div>
    )
  }
}

export default withAuth(Profile)
