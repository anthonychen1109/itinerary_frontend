import React from 'react';

const TripInput = (props) => {
  return (
    <input placeholder="Add Location" onChange={props.updateValue} value={props.additionLocationValue} />
  )
}

export default TripInput;
