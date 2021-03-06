import React, { Component } from 'react';
import WorldMap from './WorldMap';
import { Redirect } from 'react-router-dom'
import withAuth from '../HOC/withAuth'
import PlanNewTrip from './PlanNewTrip';

class NewTrip extends Component {

  state = {
    destinations: [],
    startingLocation: '',
    endingLocation: '',
    tripName: '',
    coordinates: [],
    startDate: '',
    endDate: '',
    allTrips: [],
    currentTrip: {},
    filterLocations: [],
    relations: [],
    additionalLocations: []
  }

  addStartLocation = (e) => {
    this.setState({
      startingLocation: e.target.value
    })
  }

  componentDidMount() {
    this.fetchLocations()
  }

  fetchStartLocation = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.startingLocation}&key=AIzaSyBoAZrNZdcLmM-Ei7YtwELfS20Hb3bG_N4`)
      .then( res => res.json() )
      .then( data => {
      this.setState(prevState => {
        const destination = data.results[0].formatted_address.toString()
        const coordinatesList = {lat: parseFloat(data.results[0].geometry.location.lat), lng: parseFloat(data.results[0].geometry.location.lng)}
        return {
          destinations: [destination, ...prevState.destinations],
          coordinates: [coordinatesList, ...prevState.coordinates]
        }
      }, () => this.fetchEndLocation())
    })
  }

  addEndingLocation = (e) => {
    this.setState({
      endingLocation: e.target.value
    })
  }

  fetchEndLocation = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.endingLocation}&key=AIzaSyBoAZrNZdcLmM-Ei7YtwELfS20Hb3bG_N4`)
      .then( res => res.json() )
      .then( data => {
      this.setState(prevState => {
        const destination = data.results[0].formatted_address.toString()
        const coordinatesList = {lat: parseFloat(data.results[0].geometry.location.lat), lng: parseFloat(data.results[0].geometry.location.lng)}
        return {
          destinations: [...prevState.destinations, destination],
          coordinates: [...prevState.coordinates, coordinatesList]
        }
      }, this.createNewTrip)
    })
  }

  addLocations = (newLocation) => {
    const newDestinations = [...this.state.destinations, newLocation]
    this.setState({ destinations: newDestinations })
  }

  handleAddTrip = (e) => {
    e.preventDefault()
    this.setState({
      numTrips: this.state.numTrips + 1
    });
    const newLocation = this.state.tripName
    this.setState({
      additionalLocations: [...this.state.additionalLocations, newLocation]
    })
    console.log("added trip testing");
  }

  onAddTrip = (e) => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  updateTripStartEnd = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  handleDates = (dates) => {
    const parseDates = dates.map(date => {
      return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
    })
    this.setState({
      startDate: parseDates[0],
      endDate: parseDates[1]
    }, this.fetchStartLocation)
  }

  modifyDestination = (e) => {
    e.preventDefault()
    this.setState({ destination: e.target.value }, () => console.log(this.state.destination))
  }

  findTrip = (e) => {
    e.preventDefault()
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.tripName}&key=AIzaSyBoAZrNZdcLmM-Ei7YtwELfS20Hb3bG_N4`)
    .then( res => res.json() )
    .then(data => {
      this.setState(prevState => {
        const destination = data.results[0].formatted_address.toString()
        const coordinatesList = {lat: parseFloat(data.results[0].geometry.location.lat), lng: parseFloat(data.results[0].geometry.location.lng)}
        return {
          additionalLocations: [...prevState.additionalLocations, destination],
          coordinates: [...prevState.coordinates, coordinatesList]
        }
      })
    })
    this.setState({ tripName: '' })
  }

  setDestinations = (location) => {
    this.setState({
      destinations: [...this.state.destinations, location ],
      destination: location,
      tripName: location.name
    }, () => this.persistDestination(location))
  }

  persistDestination = (location) => {
    const newLocation = {trip_id: this.state.currentTrip.id, location_id: location.id}
    return fetch(`http://localhost:3000/trip_locations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newLocation)
    })
      .then(res => res.json())
      .then(console.log)
  }

  deleteTrip = (destination, e) => {
    e.preventDefault()
    // console.log(this.state.destinations.toString());
    const removeDestination = destination
    const newDestinations = this.state.additionalLocations.filter( destination => destination !== removeDestination)
    this.setState({ additionalLocations: newDestinations }, this.deleteCoordinates)
  }

  deleteCoordinates = () => {
    console.log('deleted coords');
  }


  //CREATE TRIP and PERSIST LOCATIONS
  createNewTrip = () => {
    const currentUser = this.props.currentUser
    const newTrip = {
      title: 'My New Trip!',
      start_date: this.state.startDate,
      end_date: this.state.endDate,
      user_id: currentUser.id
    }
    fetch(`http://localhost:3000/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        "Authorization": localStorage.getItem('token')
      },
      body: JSON.stringify(newTrip)
    })
      .then(res => res.json())
      .then(this.fetchCurrentTrip)
  }

  fetchCurrentTrip = () => {
    fetch(`http://localhost:3000/trips`, {
     "method": "GET",
     "headers": {
       "Content-Type": 'application/json',
       "Accept": 'application/json',
       "Authorization": localStorage.getItem('token')
     }
   })
      .then(res => res.json())
      .then(trips => {
        // console.log(trips)
        const allMatches = trips.filter(trip => {
          return trip.user_id === this.props.currentUser.id
        })
        // console.log(allMatches[allMatches.length-1])
        const myTrip =  allMatches[allMatches.length-1]
        this.setState({
          currentTrip: myTrip
        }, this.checkLocations)
      })
  }

  checkLocations = () => {
    // console.log('Check Locs')
    const destinations = this.state.destinations
    const fetchLocations = this.state.filterLocations
    if (fetchLocations.length === 0) {
      this.createNewLocations()
    } else {
      // console.log(destinations.length, fetchLocations.length)
      for (let i = 0; i < fetchLocations.length; i++) {
        for (let j = 0; j < destinations.length; j++) {
          fetchLocations[i].name === destinations[j] ? this.findTrips() : this.createNewLocations()
        }
      }
    }
  }

  createNewLocations = () => {
    console.log("Creating if nonexistent")
    const destinations = this.state.destinations
    const coordinates = this.state.coordinates
    const newLocations = [{
      name: destinations[0],
      lat: coordinates[0].lat,
      lng: coordinates[0].lng
    },
  {
    name: destinations[1],
    lat: coordinates[1].lat,
    lng: coordinates[1].lng
  }]
  newLocations.forEach(location => {
    fetch(`http://localhost:3000/locations`, {
      method: 'POST',
      headers: {
        "Accept": 'application/json',
        "Authorization": localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(location)
    })
      .then(res => res.json())
      .then(this.findTrips)
    })
  }

  findTrips = () => {
    console.log('Finding trips')
    // console.log("Find", this.state.destinations)
    const destinations = this.state.destinations
    const fetchLocations = this.state.filterLocations
    const arr = []
    for (let i = 0; i < fetchLocations.length; i++) {
      for (let j = 0; j < destinations.length; j++) {
        fetchLocations[i].name === destinations[j] ? arr.push(fetchLocations[i]) : null
      }
    }
    const newRelations = [...this.state.relations, arr]
    this.setState({
      relations: newRelations
    }, () => this.setRelations(arr))
  }

  setRelations = (locations) => {
    console.log('We made it')
  locations.forEach(location => {
    const newRelation = {
      trip_id: this.state.currentTrip.id,
      location_id: location.id
    }
    console.log(newRelation)
    fetch(`http://localhost:3000/trip_locations`, {
      method: 'POST',
      headers: {
        "Accept": 'application/json',
        "Authorization": localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRelation)
    })
      .then(res => res.json())
      .then(console.log)
    })
  }

  fetchLocations = () => {
    return fetch(`http://localhost:3000/locations`, {
     "method": "GET",
     "headers": {
       "Content-Type": 'application/json',
       "Accept": 'application/json',
       "Authorization": localStorage.getItem('token')
     }
   })
    .then(res => res.json())
    .then(data => this.setState({
      filterLocations: data
      })
    )
  }
  // END CREATION

  render() {
    return (
      <div className="createTrip">
        <div className="trips container">
          <div className="planTrip">
            <PlanNewTrip
              destinations={this.state.destinations}
              startingLocation={this.state.startingLocation}
              endingLocation={this.state.endingLocation}
              addStartLocation={this.addStartLocation}
              addEndingLocation={this.addEndingLocation}
              tripName={this.state.tripName}
              onAddTrip={this.onAddTrip}
              handleAddTrip={this.handleAddTrip}
              findTrip={this.findTrip}
              coordinates={this.state.coordinates}
              handleDates={this.handleDates}
              modifyDestination={this.modifyDestination}
              deleteTrip={this.deleteTrip}
              additionalLocations={this.state.additionalLocations}
              />
          </div>
          <div className="worldMap">
            <WorldMap
              coordinates={this.state.coordinates}
              startingLocation={this.state.startingLocation}
              endingLocation={this.state.endingLocation}
              destinations={this.state.destinations}
              />
          </div>
        </div>
      </div>
    )
  }
}

export default NewTrip
