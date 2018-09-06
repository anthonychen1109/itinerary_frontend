import React, { Component } from 'react';
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import CreateTrip from './Containers/CreateTrip';
import './Assets/css/styles.css';
import {Route, Switch} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />

        <Route path='/' component={Home} />
        <Route path='/map' component={CreateTrip} />

      </div>
    );
  }
}

export default App;
