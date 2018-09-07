import React, { Component } from 'react';
import PlanTrip from './PlanTrip';
import WorldMap from './WorldMap';

class CreateTrip extends Component {

  state = {
    tripStartingLocation: '',
    tripEndingLocation: '',
    additionalTripLocations: ''
  }

  updateTripStartEnd = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="createTrip container">
        <div className="planTrip">
          <PlanTrip
            tripStart={this.state.tripStartingLocation}
            tripEnd={this.state.tripEndingLocation}
            updateTripStartEnd={this.updateTripStartEnd}
            additionalTripLocations={this.state.additionalTripLocations}
            />
        </div>
        <div className="worldMap">
          <WorldMap />
        </div>
      </div>
    )
  }
}

export default CreateTrip;
