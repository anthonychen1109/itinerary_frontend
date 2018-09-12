import React, {Component} from 'react'
import WorldMap from '../Containers/WorldMap'




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

      <div className="card">
        <div className= "card-content">
        <p>{trip.title}</p>
        <p>{trip.description}</p>
        <p>Start: {trip.start_date}</p>
        <p>End: {trip.end_date}</p>

        <ul >
          <p>Locations:</p>
          {this.locations(trip.locations)}
          <br/>
          <button onClick={() => this.props.editTrip(trip)}  className="button waves-effect waves-light btn-small">Edit Trip </button>
          <button onClick={() => this.props.deleteTrip(trip)} className="button2 waves-effect waves-light btn-small">Delete Trip</button>
        </ul>
        </div>
      </div>


    )
  }
}
