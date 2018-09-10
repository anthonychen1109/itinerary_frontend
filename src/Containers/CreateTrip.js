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
    destinations: ["Japan", "Spain", "Austrailia"],
    destination: '',
    tripName: '',
    tripCity: '',
    tripState: '',
    tripCountry: '',
    coordinates: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/trips").then( r => r.json())
    .then(data => this.setState({ allTrips: data }, this.getNumTrips))
  }

  getNumTrips = () => {
    this.state.allTrips.map( trip => {
      this.setState({ numTrips: trip.locations.length, destinations: trip.locations }, this.getCoordinates)
    })
  }

  getCoordinates = () => {
    this.state.destinations.map( destination => {
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
    this.setState({ destinations: newDestinations })
  }

  updateTripStartEnd = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  render() {
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
            tripState={this.state.tripCity}
            tripCountry={this.state.tripCountry}
            handleAddTrip={this.handleAddTrip}
            onAddTrip={this.onAddTrip}
            deleteTrip={this.deleteTrip}
            modifyDestination={this.modifyDestination}
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
