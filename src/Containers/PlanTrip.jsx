import React, { Component } from 'react';
import Calendar from 'react-calendar';
import TripModal from './TripModal';
import TripInput from './TripInput';

class PlanTrip extends Component {

  state = {
    numTrips: 0,
    allLocations: {},
    allTrips: [],
    destinations: ["new york", "paris", "london"],
    destination: ''
  }

  componentDidMount() {
    // fetch("http://localhost:3000/trips").then( r => r.json())
    // .then(data => this.setState({ allTrips: data }, this.getNumTrips))
  }

  getNumTrips = () => {
    // this.state.allTrips.map( trip => {
    //   this.setState({ numTrips: trip.all_trips, destinations: trip.destinations })
    // })
  }

  onAddTrip = (e) => {
    e.preventDefault()
    this.setState({
      numTrips: this.state.numTrips + 1
    });
  }

  modifyDestination = (e) => {
    this.setState({ destination: e.target.value }, () => console.log(this.state.destination))
  }

  deleteTrip = (destination, e) => {
    e.preventDefault()
    const removeDestination = destination
    const newDestinations = this.state.destinations.filter( destination => destination !== removeDestination)
    this.setState({ destinations: newDestinations })
  }

  render() {
    const renderTrips = this.state.destinations.map( (destination, index) =>
      <TripInput
        key={index}
        destination={destination}
        modifyDestination={this.modifyDestination}
        deleteTrip={this.deleteTrip}/>
    )
    return (
      <div>
        <form>
          <div className="planTripForm input-field inline">
            <h3 className="planTripHeaders">
            </h3>
            <input placeholder="Starting Location" size="large" value={this.props.tripStartingLocation} name="tripStart" onChange={this.props.updateTripStartEnd}/>
          </div>
          <div className="planTripInputs">
            <h5>Locations: </h5>
            {renderTrips}
          </div>
          <button
            className="planTripAddBtn btn btn-primary"
            onClick={this.onAddTrip}>+</button>
          <div>
            <input placeholder="Ending Location" size="large" value={this.props.tripEndingLocation} name="tripEnd" onChange={this.props.updateTripStartEnd}/>
          </div>

          <div className="planTripSelectButton">
            <TripModal />
          </div>
        </form>
      </div>
    )
  }
}

export default PlanTrip;
