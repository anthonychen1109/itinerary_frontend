import React, { Component } from 'react';
import PlanTrip from './PlanTrip';
import WorldMap from './WorldMap';

class CreateTrip extends Component {

  state = {
    tripStart: '',
    tripEnd: ''
  }

  updateTripStartEnd = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  render() {
    return (
      <div>
        <PlanTrip tripStart={this.state.tripStart} tripEnd={this.state.tripEnd}/>
        <WorldMap />
      </div>
    )
  }
}

export default CreateTrip;
