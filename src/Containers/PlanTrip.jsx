import React, { Component } from 'react';
import Calendar from 'react-calendar';
import TripModal from './TripModal';
import TripInput from './TripInput';
import AddTripModal from './AddTripModal';

class PlanTrip extends Component {

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
