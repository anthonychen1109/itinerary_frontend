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
    // this.fetchLocations()
    //   .then(data => this.setState({
    //     filterLocations: data
    //   }))
  }

  fetchStartLocation = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.startingLocation}&key=AIzaSyBoAZrNZdcLmM-Ei7YtwELfS20Hb3bG_N4`)
      .then( res => res.json() )
      .then( data => {
        console.log(data.results);
      this.setState(prevState => {
        const destination = data.results[0].formatted_address.toString()
        const coordinatesList = {lat: parseFloat(data.results[0].geometry.location.lat), lng: parseFloat(data.results[0].geometry.location.lng)}
        const startingDestination = {
          name: data.results[0].formatted_address,
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng
        }
        return {
          filterLocations: [startingDestination],
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
        const endingDestination = {
          name: data.results[0].formatted_address,
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng
        }
        return {
          filterLocations: [...this.state.filterLocations, endingDestination],
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
        const currentFilterLocations = this.state.filterLocations
        const newDestination = {
          name: data.results[0].formatted_address,
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng
        }
        return {
          filterLocations: currentFilterLocations.splice(1, 0, newDestination),
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
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token')
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
    const newLocations = []
    const destinations = this.state.destinations
    const fetchLocations = this.fetchLocations()

    if (fetchLocations.length === 0) {
      this.createNewLocations(fetchLocations)
    } else {
      // console.log(destinations.length, fetchLocations.length)
      for (let i = 0; i < fetchLocations.length; i++) {
        for (let j = 0; j < destinations.length; j++) {
          fetchLocations[i].name === destinations[j]
          ? this.findTrips(destinations[j])
          // : this.createNewLocations()
          : newLocations.push(destinations[j])
        }
      }
      const newLocationsSet = new Set(newLocations)
      const newLocationsArray = [...newLocationsSet]
      this.createNewLocations(newLocationsArray)
    }
  }

  createNewLocations = (locations) => {
    console.log("Creating if nonexistent")
    // const destinations = this.state.destinations
    const coordinates = this.state.coordinates
    const locs = locations.map( (location, index) => {
      const newLocations = {
        name: location,
        lat: coordinates[index].lat,
        lng: coordinates[index].lng
      }
      return newLocations
    })
  locs.forEach(location => {
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
      .then(data => this.findTrips(data))
    })
  }

  findTrips = (destination) => {
    console.log('Finding trips')
    console.log("destination", destination);
    this.fetchLocations()
    this.state.filterLocations.find( location => {
      return location.name === destination.name
    })
    this.setRelations(destination)
      // .then(response => response.json())
      // .then(data => console.log(data))
    // const arr = []
    // const foundLocation = fetchL.then(locations => {
    //   locations.find( location => {
    //     return location.name === destination.name
    //   })
    // })
    //
    // this.setRelations(foundLocation)

  }

  setRelations = (location) => {
    // console.log('We made it')
    // console.log(location);
    this.state.filterLocations.forEach( location => {
      const newRelation = {
        trip_id: this.state.currentTrip.id,
        location_id: location.id
      }
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
        .then(data => console.log(data))
    })
  // locations.forEach(location => {
  //   const newRelation = {
  //     trip_id: this.state.currentTrip.id,
  //     location_id: location.id
  //   }
  // //   console.log(newRelation)
  //   fetch(`http://localhost:3000/trip_locations`, {
  //     method: 'POST',
  //     headers: {
  //       "Accept": 'application/json',
  //       "Authorization": localStorage.getItem('token'),
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(newRelation)
  //   })
  //     .then(res => res.json())
  //     .then(data => console.log(data))
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
    }))
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
