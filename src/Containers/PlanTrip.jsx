import React, { Component } from 'react';
import Calendar from 'react-calendar';
import TripModal from './TripModal';
import TripInput from './TripInput';
import AddTripModal from './AddTripModal';

class PlanTrip extends Component {

  state = {
    numTrips: 0,
    allLocations: {},
    allTrips: [],
    destinations: ["new york", "paris", "london"],
    destination: '',
    tripName: '',
    tripCity: '',
    tripState: '',
    tripCountry: ''
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

  handleAddTrip = (e) => {
    e.preventDefault()
    // this.setState({
    //   numTrips: this.state.numTrips + 1
    // });
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
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value })
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
      <div className="planTripAddBtn">
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
          <div className="planTripAdd">
            <AddTripModal
              onAddTrip={this.onAddTrip}
              handleAddTrip={this.handleAddTrip}
              tripName={this.state.tripName}
              tripCity={this.state.tripCity}
              tripState={this.state.tripState}
              tripCountry={this.state.tripCountry}/>
            <p className="planTripAddP">Add another location</p>
          </div>
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
