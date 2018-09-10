import React, { Component } from 'react';
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import CreateTrip from './Containers/CreateTrip';
import './Assets/css/styles.css';
import Login from './Components/Login'
import Register from './Components/Register'
import {Route} from 'react-router-dom'

class App extends Component {

  state = {
    username: '',
    password: '',
    trips: [],
    avatar_url: ''
  }

  handleUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handlePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleAvatar = (e) => {
    this.setState({
      avatar_url: e.target.value
    })
  }

  setAuthToken = (resp) => {
    this.setState({
      auth_token: resp.token
    })
  }






  render() {
    console.log(this.state.auth_token)
    return (
      <div>
        <NavBar />
        <Route exact path='/' component={Home} />
        <Route exact path='/map' component={CreateTrip} />
        <Route exact path='/login' render={() => <Login
          username={this.state.username}
          password={this.state.password}
          auth_token={this.props.auth_token}
          handleUsername={this.handleUsername}
          handlePassword={this.handlePassword} />} />
        <Route exact path='/register' render={() => <Register
          username={this.state.username}
          password={this.state.password}
          avatar_url={this.state.avatar_url}
          handleAvatar={this.handleAvatar}
          handleUsername={this.handleUsername}
          handlePassword={this.handlePassword}  />} />
      </div>
    );
  }
}

export default App;
