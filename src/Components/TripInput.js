import React from 'react';

const TripInput = (props) => {
  return (
    <div className="tripInputDiv">
      <input className="tripInput" value={props.destination} placeholder="Add a location" onChange={props.modifyDestination}/>
      <button
        className="tripInputDeleteButton"
        onClick={(e) => props.deleteTrip(props.destination, e)}>x</button>
    </div>
  )
}

export default TripInput;
