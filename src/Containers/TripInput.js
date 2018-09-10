import React, { Component } from 'react';

class TripInput extends Component {

  render() {
    return (
      <div className="tripInputDiv">
        <input className="tripInput" value={this.props.destination} placeholder="Add a location" onChange={this.props.modifyDestination}/>
        <button
          className="tripInputDeleteButton"
          onClick={(e) => this.props.deleteTrip(this.props.destination, e)}>x</button>
      </div>
    )
  }
}

export default TripInput;
