import React, { Component } from 'react';
import {Input} from 'antd';
import Calendar from 'react-calendar';
import TripModal from './TripModal';
import TripInput from './TripInput';

class PlanTrip extends Component {

  state = {
    numTrips: 5
  }

  onAddTrip = () => {
    this.setState({
      numTrips: this.state.numTrips + 1
    });
  }

  render() {
    const tripInputs = [];

    for (let i = 0; i < this.state.numTrips; i += 1) {
      tripInputs.push( <TripInput /> );
    };

    return (
      <div>
        <form>
          <div className="planTripForm">
            <h3 className="planTripHeaders">
              Starting Location:
            </h3>
            <Input placeholder="Starting Location" size="large" value={this.props.tripStart} name="tripStart"/>
          </div>
          <div>
            <h3 className="planTripHeaders">
              Ending Location:
            </h3>
            <Input placeholder="Ending Location" size="large" value={this.props.tripEnd} name="tripEnd"/>
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
