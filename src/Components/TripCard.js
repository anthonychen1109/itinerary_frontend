import React, {Component} from 'react'





export default class TripCard extends Component {

  locations = (locations) => {
    return locations.map(location => {
      return <li key={location.id}>{location.name}</li>
    })
  }

  render() {
    console.log(this.props.trip)
    const trip = this.props.trip
    return (

      <div className="card small">
        <div className= "card-content">
        <p>{trip.title}</p>
        <p>{trip.description}</p>
        <p>Start: {trip.start_date}</p>
        <p>End: {trip.end_date}</p>

        <ul>
          <p>Locations:</p>
          {this.locations(trip.locations)}
        </ul>
        </div>
      </div>


    )
  }
}
