import React, { Component } from 'react';
import Calendar from 'react-calendar';
import TripModal from './TripModal';
import TripInput from './TripInput';
import AddTripModal from './AddTripModal';

class PlanNewTrip extends Component {

  render() {
    // console.log(this.props.destinations);
    // console.log(this.props.coordinates);
    // const renderTrips = () => {
    //   if (this.props.destinations.length > 0){
    //     const renderTrips = this.props.destinations.map( (destination, index) =>
    //       <TripInput
    //         key={index}
    //         destination={destination}
    //         modifyDestination={this.props.modifyDestination}
    //         deleteTrip={this.props.deleteTrip}/>
    //     )
    //   } else {
    //     return <div>Add another location</div>
    //   }
    // }

    const renderTrips = () => {
      if (this.props.destinations === 1) {
        return <TripInput destination={this.props.destinations[0]} modifyDestination={this.props.modifyDestination} deleteTrip={this.props.deleteTrip} />
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
              tripCity={this.props.tripCity}
              tripState={this.props.tripState}
              tripCountry={this.props.tripCountry}
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
            <TripModal />
          </div>
        </div>
      </div>
    )
  }
}

export default PlanNewTrip;
