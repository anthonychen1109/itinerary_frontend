import React, { Component } from 'react';
import Calendar from 'react-calendar';
import TripModal from './TripModal';
import TripInput from './TripInput';

class PlanTrip extends Component {

  state = {
    numTrips: 0,
    allLocations: {},
    allTrips: [],
    value: ''
  }

  componentDidMount() {
    fetch("http://localhost:3000/trips").then( r => r.json())
    .then(data => this.setState({ allTrips: data }, this.getNumTrips))
  }

  getNumTrips = () => {
    this.state.allTrips.map( trip => {
      this.setState({ numTrips: trip.all_trips })
    })
  }

  onAddTrip = (e) => {
    e.preventDefault()
    this.setState({
      numTrips: this.state.numTrips + 1
    });
  }


  updateValue = e => {
    this.setState({ value: e.target.value})
  }

  render() {
    const tripInputs = [];

    for (let i = 0; i < this.state.numTrips; i += 1) {
      tripInputs.push( <TripInput key={i} additionLocationValue={this.state.value} updateValue={this.updateValue}/> );
    };

    return (
      <div>
        <form>
          <div className="planTripForm input-field inline">
            <h3 className="planTripHeaders">
            </h3>
            <input placeholder="Starting Location" size="large" value={this.props.tripStartingLocation} name="tripStart" onChange={this.props.updateTripStartEnd}/>
          </div>
          <div>
            <input placeholder="Ending Location" size="large" value={this.props.tripEndingLocation} name="tripEnd" onChange={this.props.updateTripStartEnd}/>
          </div>
          <div>
            {tripInputs}
          </div>

          <button
            className="planTripAddBtn btn btn-primary"
            onClick={this.onAddTrip}>+</button>

          <div className="planTripSelectButton">
            <TripModal />
          </div>
        </form>
      </div>
    )
  }
}

export default PlanTrip;
