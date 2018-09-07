import React, { Component } from 'react';
import {Input} from 'antd';
import Calendar from 'react-calendar';
import TripModal from './TripModal';

class PlanTrip extends Component {

  render() {
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
          <div className="planTripSelectButton">
            <TripModal />
          </div>
        </form>
      </div>
    )
  }
}

export default PlanTrip;
