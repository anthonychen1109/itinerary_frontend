import React, { Component } from 'react';
import PlanTrip from './PlanTrip';
import WorldMap from './WorldMap';

class CreateTrip extends Component {

  state = {
    tripStartingLocation: '',
    tripEndingLocation: '',
    additionalTripLocations: '',
    numTrips: 0,
    allLocations: {},
    allTrips: [],
    destinations: [],
    destination: '',
    tripName: '',
    tripCity: '',
    tripState: '',
    tripCountry: 'France',
    coordinates: [],
    currentTrip: ''
  }

  componentDidMount() {
    fetch("http://localhost:3000/trips").then( r => r.json())
    .then(data => this.setState({ allTrips: data}, this.getNumTrips))
  }

  getNumTrips = () => {
    return this.state.allTrips.map( trip => {
      this.setState({ numTrips: trip.locations.length, destinations: trip.locations, currentTrip: trip }, () => this.getCoordinates())
    })
  }

  getCoordinates = () => {
    console.log('test');
    // console.log(this.state.destinations)
    let arr = this.state.destinations.map( destination => {
      return destination
    })
    this.setState({
      destinations: arr
    }, this.markerCoordinates)
  }

  markerCoordinates = () => {
    this.state.destinations.forEach( destination => {
      this.setState(prevState => ({
        coordinates: [...prevState.coordinates, [destination.lat, destination.lng]]
      }))
    })
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

  modifyDestination = (e) => {
    e.preventDefault()
    this.setState({ destination: e.target.value }, () => console.log(this.state.destination))
  }

  deleteTrip = (destination, e) => {
    e.preventDefault()
    const removeDestination = destination
    const newDestinations = this.state.destinations.filter( destination => destination.country !== removeDestination)
    this.setState({ destinations: newDestinations }, this.deleteCoordinates)
  }

  deleteCoordinates = () => {
    this.setState({ coordinates: [] })
    return this.state.destinations.map( destination => {
    return this.setState(prevState => ({
        coordinates: [...prevState.coordinates, [destination.lat, destination.lng]]
      }))
    })
  }

  updateTripStartEnd = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }


  findTrip = (e) => {
    e.preventDefault()
    return fetch(`http://localhost:3000/locations`)
      .then(res => res.json())
      .then(locations => {
        return locations.find(location => {
          return location.country === this.state.tripCountry ? this.setDestinations(location) : null
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
    console.log(newLocation)
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



  render() {
    // console.log(this.state.coordinates);
    // console.log(this.state.currentTrip)
    return (
      <div className="createTrip container">
        <div className="planTrip">
          <PlanTrip
            destinations={this.state.destinations}
            tripStart={this.state.tripStartingLocation}
            tripEnd={this.state.tripEndingLocation}
            updateTripStartEnd={this.updateTripStartEnd}
            additionalTripLocations={this.state.additionalTripLocations}
            tripName={this.state.tripName}
            tripCity={this.state.tripCity}
            tripState={this.state.tripState}
            tripCountry={this.state.tripCountry}
            handleAddTrip={this.handleAddTrip}
            onAddTrip={this.onAddTrip}
            deleteTrip={this.deleteTrip}
            modifyDestination={this.modifyDestination}
            deleteCoordinates={this.deleteCoordinates}
            findTrip={this.findTrip}

            />

        </div>
        <div className="worldMap">
          <WorldMap coordinates={this.state.coordinates}/>
        </div>
      </div>
    )
  }
}

export default CreateTrip;
