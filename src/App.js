import React, { Component } from 'react';
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import CreateTrip from './Containers/CreateTrip';
import './Assets/css/styles.css';
import Login from './Components/Login'
import {Route, Switch} from 'react-router-dom'

class App extends Component {

  state = {
    username: ''
  }

  render() {
    return (
      <div>
        <NavBar />

        <Route exact path='/' component={Home} />
        <Route exact path='/map' component={CreateTrip} />

      </div>
    );
  }
}

export default App;
