import React, {Component} from 'react'





export default class TripCard extends Component {

  locations = (locations) => {
    return locations.map(location => {
      return <li className="tripcard-locations" key={location.id}>{location.name}</li>
    })
  }

  render() {
    const trip = this.props.trip
    return (

      <div className="card">
        <div className= "card-content">
        <p>{trip.title}</p>
        <p>{trip.description}</p>
        <p>Start: {trip.start_date}</p>
        <p>End: {trip.end_date}</p>

        <ul>
          <p>Locations:</p>
          {this.locations(trip.locations)}
          <button onClick={() => this.props.deleteTrip(trip)} className="button2 waves-effect waves-light btn-small">Delete Trip</button>
        </ul>
        </div>
      </div>


    )
  }
}
