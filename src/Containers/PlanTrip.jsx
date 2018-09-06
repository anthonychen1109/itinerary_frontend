import React, { Component } from 'react';

class PlanTrip extends Component {
  render() {
    return (
      <div>
        <form>
          <input type="text" value={this.props.tripStart} placeholder="Starting Location" name="tripStart"/>
          <input type="text" value={this.props.tripEnd} placeholder="Ending Location" name="tripEnd"/>
        </form>
      </div>
    )
  }
}

export default PlanTrip;
