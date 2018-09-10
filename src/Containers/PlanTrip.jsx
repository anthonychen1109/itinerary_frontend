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
    tripCountry: '',
    currentTrip: ''
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
    }, this.persistTrip)
    // console.log("added trip testing");
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

  persistTrip = () => {
    const findTrip = this.state.tripCity
    fetch(`http://localhost:3000/locations`)
      .then(res => res.json())
      .then(locations => {
        locations.map(location => {
          if (location.city.toLowerCase() === findTrip.toLowerCase()) {
            console.log(location)
            this.setState({
                destinations: [...this.state.destinations, location],
                tripName: location.name,
                tripCity: location.city,
                tripState: location.state,
                tripCountry: location.country
            })
          } else {
            console.log("NOTHING")
          }
        })
      }, () => console.log(this.state.destinations))
  }

  render() {
    const renderTrips = this.props.destinations.map( (destination, index) =>
      <TripInput
        key={index}
        destination={destination.country}
        modifyDestination={this.props.modifyDestination}
        deleteTrip={this.props.deleteTrip}/>
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
              onAddTrip={this.props.onAddTrip}
              handleAddTrip={this.props.handleAddTrip}
              tripName={this.props.tripName}
              tripCity={this.props.tripCity}
              tripState={this.props.tripState}
              tripCountry={this.props.tripCountry}/>
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
