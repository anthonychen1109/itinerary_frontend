import React, { Component } from 'react';
import {Input} from 'antd';

class PlanTrip extends Component {
  render() {
    return (
      <div>
        <form>
          <div className="planTripForm">
            Starting Location:
            <Input placeholder="Starting Location" size="small" value={this.props.tripStart} name="tripStart"/>
          </div>
          <div>
            Ending Location:
            <Input placeholder="Ending Location" size="small" value={this.props.tripEnd} name="tripEnd"/>
          </div>
        </form>
      </div>
    )
  }
}

export default PlanTrip;
