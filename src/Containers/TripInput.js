import React, { Component } from 'react';

<<<<<<< HEAD
const TripInput = (props) => {
  return (
  <input className="tripInput" defaultValue={props.destination} placeholder="Add a location" />
  )
=======
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
>>>>>>> c1ff7ae0d43a69b73f2ef332b04e84788f6c0a4e
}

export default TripInput;
