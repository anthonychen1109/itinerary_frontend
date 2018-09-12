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
    coordinates: [],
    currentTrip: '',
    startDate: '',
    endDate: '',
    allTrips: [],
    currentTrip: {}
  }

  addStartLocation = (e) => {
    this.setState({
      startingLocation: e.target.value
    })
  }

  fetchStartLocation = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.startingLocation}&key=AIzaSyBoAZrNZdcLmM-Ei7YtwELfS20Hb3bG_N4`)
      .then( res => res.json() )
      .then( data => {
      this.setState(prevState => {
        const destination = data.results[0].formatted_address.toString()
        const coordinatesList = {lat: parseFloat(data.results[0].geometry.location.lat), lng: parseFloat(data.results[0].geometry.location.lng)}
        return {
          destinations: [...prevState.destinations, destination],
          coordinates: [...prevState.coordinates, coordinatesList]
        }
      }, () => this.fetchEndLocation())
    })
  }

  addEndingLocation = (e) => {
    this.setState({
      endingLocation: e.target.value
    })
  }

  fetchEndLocation = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.endingLocation}&key=AIzaSyBoAZrNZdcLmM-Ei7YtwELfS20Hb3bG_N4`)
      .then( res => res.json() )
      .then( data => {
      this.setState(prevState => {
        const destination = data.results[0].formatted_address.toString()
        const coordinatesList = {lat: parseFloat(data.results[0].geometry.location.lat), lng: parseFloat(data.results[0].geometry.location.lng)}
        return {
          destinations: [...prevState.destinations, destination],
          coordinates: [...prevState.coordinates, coordinatesList]
        }
      }, this.createNewTrip)
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

  handleDates = (dates) => {
    const parseDates = dates.map(date => {
      return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
    })
    this.setState({
      startDate: parseDates[0],
      endDate: parseDates[1]
    }, this.fetchStartLocation)
  }

  modifyDestination = (e) => {
    e.preventDefault()
    this.setState({ destination: e.target.value }, () => console.log(this.state.destination))
  }

  findTrip = (e) => {
    e.preventDefault()
    console.log('findtrip');
    // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.tripName}&key=AIzaSyBoAZrNZdcLmM-Ei7YtwELfS20Hb3bG_N4`)
    // .then( res => res.json() )
    // .then(data => {
    //   const destinationsList = [...this.state.destinations, data.results[0].formatted_address.toString()]
    //   const coordinatesList = [...this.state.coordinates, [parseFloat(data.results[0].geometry.location.lat), parseFloat(data.results[0].geometry.location.lng)]]
    //   this.setState({
    //     destinations: destinationsList,
    //     coordinates: coordinatesList
    //   })
    // })
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


  //CREATE TRIP and PERSIST LOCATIONS
  createNewTrip = () => {
    const currentUser = this.props.currentUser
    const newTrip = {
      title: 'My New Trip!',
      start_date: this.state.startDate,
      end_date: this.state.endDate,
      user_id: currentUser.id
    }
    fetch(`http://localhost:3000/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        "Authorization": localStorage.getItem('token')
      },
      body: JSON.stringify(newTrip)
    })
      .then(res => res.json())
      .then(console.log)
  }

  // createNewLocations = () => {
  //   fetch(`http://localhost:3000/trip_locations`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(newTrip)
  //   })
  //     .then(res => res.json())
  // }

  // END CREATION

  deleteCoordinates = () => {
    console.log('delete coordinates');
  }

  render() {
    console.log(this.props.currentUser);

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
            handleDates={this.handleDates}
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
