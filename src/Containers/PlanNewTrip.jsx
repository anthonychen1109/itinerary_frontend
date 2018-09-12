import React, { Component } from 'react';
import Calendar from 'react-calendar';
import TripModal from './TripModal';
import TripInput from './TripInput';
import AddTripModal from './AddTripModal';

class PlanNewTrip extends Component {

  render() {
    // Render all trips
    const renderTrips = () => {
      // If there is only 1 destination other than start and end
      if (this.props.additionalLocations.length === 1) {
        return <TripInput destination={this.props.additionalLocations[0]} modifyDestination={this.props.modifyDestination} deleteTrip={this.props.deleteTrip} />
      }
      // If there is more than 1 destination other than start and end
      else if(this.props.additionalLocations.length > 1) {
        return this.props.additionalLocations.map( (location, index) => {
          return <TripInput
            key={index}
            destination={location}
            modifyDestination={this.props.modifyDestination}
            deleteTrip={this.props.deleteTrip}/>
        })
      } // if there are no destinations
      else {
        return <div>Add another location</div>
      }
    }

    return (
      <div className="planTripAddBtn">
        <div id="form">
          <div className="planTripForm input-field inline">
            <h3 className="planTripHeaders">
              Create Your Trip
            </h3>
            <input
              type="text"
              placeholder="Starting Location"
              value={this.props.startingLocation}
              onChange={this.props.addStartLocation}
              />
          </div>
          <div className="planTripInputs">
            <h5>Locations: </h5>
            {renderTrips()}
          </div>
          <div className="planTripAdd">
            <AddTripModal
              onAddTrip={this.props.onAddTrip}
              handleAddTrip={this.props.handleAddTrip}
              tripName={this.props.tripName}
              findTrip={this.props.findTrip}/>
            <p className="planTripAddP">Add another location</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Ending Location"
              value={this.props.endingLocation}
              onChange={this.props.addEndingLocation}
              />
          </div>

          <div className="planTripSelectButton">
            <TripModal handleDates={this.props.handleDates}/>
          </div>
        </div>
      </div>
    )
  }
}

export default PlanNewTrip;
