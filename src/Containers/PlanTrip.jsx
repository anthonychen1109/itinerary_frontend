import React, { Component } from 'react';
import Calendar from 'react-calendar';

class PlanTrip extends Component {

  state = {
    date: new Date()
  }

  handleChange = (date) => {
    this.setState({ date })
  }

  render() {
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
          <div className="planTripCalendar">
            <Calendar onChange={this.handleChange} value={this.state.date}/>
          </div>
        </form>
      </div>
    )
  }
}

export default PlanTrip;
