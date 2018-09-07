import React, { Component } from 'react';
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import CreateTrip from './Containers/CreateTrip';
import './Assets/css/styles.css';
import Login from './Components/Login'
import Register from './Components/Register'
import {Route, Switch} from 'react-router-dom'

class App extends Component {



  render() {
    return (
      <div>
        <NavBar />

        <Route exact path='/' component={Home} />
        <Route exact path='/map' component={CreateTrip} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </div>
    );
  }
}

export default App;
