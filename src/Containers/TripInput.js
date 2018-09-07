import React, { Component } from 'react';

class TripInput extends Component {
  state = {
    destination: ""
  }

  render() {
    console.log(this.props);
    return (
      <div className="tripInputDiv">
        <input className="tripInput" value={this.props.destination} placeholder="Add a location" onChange={this.props.modifyDestination}/>
        <button className="tripInputDeleteButton">x</button>
      </div>
    )
  }
}

export default TripInput;
