import React, { Component } from 'react';
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import CreateTrip from './Containers/CreateTrip';
import './Assets/css/styles.css';
import Login from './Components/Login'
import Register from './Components/Register'
import {Route} from 'react-router-dom'
import Profile from './Components/Profile'
class App extends Component {

  state = {
    auth: {
      authenticating: true,
      currentUser: {}
    }
  }

  handleLoginUser = (user) => {
    const newAuth = {
        ...this.state.auth,
        authenticating: false,
        currentUser: user
      }
      this.setState({
        auth: newAuth
      })
    }

    componentDidMount() {
      if (localStorage.getItem('token')) {
        return fetch('http://localhost:3000/reauth', {
          "method": "GET",
          "headers": {
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Authorization": localStorage.getItem('token')
          }
        })
      } else {
        this.setState( prevState => ({
          auth: {
            ...prevState.auth,
            authenticating: false
          }
        }))
      }
    }








  render() {
    const loggedIn = !!this.state.auth.currentUser.id
    return (
      <div>
        <NavBar />
        <Route exact path='/profile' render={() => <Profile loggedIn={loggedIn} />} />
        <Route exact path='/' component={Home} />
        <Route exact path='/map' render={() => <CreateTrip loggedIn={loggedIn} />} />
        <Route exact path='/login' render={() => <Login
          loggedIn={loggedIn}
         handleLoginUser={this.handleLoginUser}/>} />
        <Route exact path='/register' render={() => <Register loggedIn={loggedIn} />} />
      </div>
    );
  }
}

export default App;
