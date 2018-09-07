import React, { Component } from 'react';
import Calendar from 'react-calendar';
import TripModal from './TripModal';

class PlanTrip extends Component {

  state = {
    startDate: new Date()
  }

  handleChange = (date) => {
    this.setState({ startDate: date })
  }

  render() {
    console.log(this.state.date);
    return (
      <div>
        <form>
          <div className="planTripForm input-field inline">
            <h3 className="planTripHeaders">
            </h3>
            <input placeholder="Starting Location" size="large" value={this.props.tripStart} name="tripStart"/>
          </div>
          <div>
            <h3 className="planTripHeaders">
            </h3>
            <input  placeholder="Ending Location" size="large" value={this.props.tripEnd} name="tripEnd"/>
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
