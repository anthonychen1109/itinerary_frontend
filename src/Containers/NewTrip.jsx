import React, { Component } from 'react';
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
    coordinates: '',
    currentTrip: ''
  }

  addStartLocation = (e) => {
    this.setState({
      startingLocation: e.target.value
    })
  }

  fetchStartLocation = (location) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBoAZrNZdcLmM-Ei7YtwELfS20Hb3bG_N4`)
      .then( res => res.json() )
      .then( data => {
      const destinationsList = [...this.state.destinations, data.results[0].formatted_address.toString()]
      const coordinatesList = [...this.state.coordinates, [parseFloat(data.results[0].geometry.location.lat), parseFloat(data.results[0].geometry.location.lng)]]
      this.setState({
        destinations: destinationsList,
        coordinates: coordinatesList
      })
      })
  }

  addEndingLocation = (e) => {
    this.setState({
      endingLocation: e.target.value
    })
  }

  fetchEndLocation = (location) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBoAZrNZdcLmM-Ei7YtwELfS20Hb3bG_N4`)
      .then( res => res.json() )
      .then( data => {
      const destinationsList = [...this.state.destinations, data.results[0].formatted_address.toString()]
      const coordinatesList = [...this.state.coordinates, [parseFloat(data.results[0].geometry.location.lat), parseFloat(data.results[0].geometry.location.lng)]]
      this.setState({
        destinations: destinationsList,
        coordinates: coordinatesList
      })
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
      tripName: ''
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

  modifyDestination = (e) => {
    e.preventDefault()
    this.setState({ destination: e.target.value }, () => console.log(this.state.destination))
  }

  findTrip = (e) => {
    e.preventDefault()
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.tripName}&key=AIzaSyBoAZrNZdcLmM-Ei7YtwELfS20Hb3bG_N4`)
    .then( res => res.json() )
    .then(data => {
      const destinationsList = [...this.state.destinations, data.results[0].formatted_address.toString()]
      const coordinatesList = [...this.state.coordinates, [parseFloat(data.results[0].geometry.location.lat), parseFloat(data.results[0].geometry.location.lng)]]
      this.setState({
        destinations: destinationsList,
        coordinates: coordinatesList
      })
    })
  }

  setDestinations = (location) => {
    this.setState({
      destinations: [...this.state.destinations, location ],
      destination: location,
      tripName: location.name
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


  deleteTrip = (destination, e) => {
    e.preventDefault()
    console.log(destination);
    console.log(this.state.destinations.toString());
    const removeDestination = destination
    const newDestinations = this.state.destinations.filter( destination => destination !== removeDestination)
    this.setState({ destinations: newDestinations }, this.deleteCoordinates)
  }

  deleteCoordinates = () => {
    console.log('delete coordinates');
  }

  render() {
    console.log(this.state.coordinates);
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
            onAddTrip={this.onAddTrip}
            handleAddTrip={this.handleAddTrip}
            findTrip={this.findTrip}
            coordinates={this.state.coordinates}
            modifyDestination={this.modifyDestination}
            deleteTrip={this.deleteTrip}
            />
        </div>
        <div className="worldMap">
          <WorldMap
            coordinates={this.state.coordinates}
            startingLocation={this.state.startingLocation}
            endingLocation={this.state.endingLocation}
            destinations={this.state.destinations}
            />
        </div>
      </div>
    )
  }
}

export default NewTrip
