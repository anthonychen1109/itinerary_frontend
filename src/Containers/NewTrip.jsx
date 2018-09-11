import React, { Component } from 'react';
import PlanTrip from './PlanTrip';
import WorldMap from './WorldMap';
import { Redirect } from 'react-router-dom'
import withAuth from '../HOC/withAuth'
import PlanNewTrip from './PlanNewTrip';

class NewTrip extends Component {

  state = {
    destinations: [],
    startingLocation: '',
    endingLocation: '',
    tripName: '',
    tripCity: '',
    tripState: '',
    tripCountry: '',
    startDate: '',
    endDate: ''
  }

  addStartLocation = (e) => {
    this.setState({
      startingLocation: e.target.value
    })
  }

  addEndingLocation = (e) => {
    this.setState({
      endingLocation: e.target.value
    })
  }

  addLocations = (newLocation) => {
    const newDestinations = [...this.state.destinations, newLocation]
    this.setState({ destinations: newDestinations })
  }

  handleAddTrip = (e) => {
    e.preventDefault()
    this.setState({
      numTrips: this.state.numTrips + 1
    });
    const newLocation = this.state.tripName
    this.setState({
      destinations: [...this.state.destinations, newLocation],
      tripName: '',
      tripCity: '',
      tripState: '',
      tripCountry: ''
    })
    console.log("added trip testing");
  }

  onAddTrip = (e) => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  updateTripStartEnd = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }


  findTrip = (e) => {
    e.preventDefault()
    return fetch(`http://localhost:3000/locations`)
      .then(res => res.json())
      .then(console.log)
      .then(locations => {
        return locations.find(location => {
          console.log(location)
          return location.city === this.state.tripCity ? this.setDestinations(location) : null
        })
      })
  }

  setDestinations = (location) => {
    this.setState({
      destinations: [...this.state.destinations, location ],
      destination: location,
      tripName: location.name,
      tripCity: location.city,
      tripState: location.state,
      tripCountry: location.country
    }, () => this.persistDestination(location))
  }

  persistDestination = (location) => {
    const newLocation = {trip_id: this.state.currentTrip.id, location_id: location.id}
    return fetch(`http://localhost:3000/trip_locations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newLocation)
    })
      .then(res => res.json())
      .then(console.log)
  }

  handleDates = (e) => {
    console.log(e)
  }


  render() {
    return (
      <div className="createTrip container">
        <div className="planTrip">
          <PlanNewTrip
            destinations={this.state.destinations}
            startingLocation={this.state.startingLocation}
            endingLocation={this.state.endingLocation}
            addStartLocation={this.addStartLocation}
            addEndingLocation={this.addEndingLocation}
            tripName={this.state.tripName}
            tripCity={this.state.tripCity}
            tripState={this.state.tripState}
            tripCountry={this.state.tripCountry}
            onAddTrip={this.onAddTrip}
            handleAddTrip={this.handleAddTrip}
            findTrip={this.findTrip}
            />
        </div>
        <div className="worldMap">
          <WorldMap
            destinations={this.state.destinations}
            />
        </div>
      </div>
    )
  }
}

export default NewTrip
