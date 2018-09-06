import React, { Component } from 'react';
import { Menu , Icon } from 'antd'

export default class NavBar extends Component {


  state = {
    current: 'mail',
    theme: 'light'
  }


  handleClick = (e) => {
   console.log('click ', e);
   this.setState({
     current: e.key,
   });
 }




  render() {
    console.log(this.state.current)
    return (
      <div className="menu">
        <Menu
        theme={this.state.theme}
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal">
        <img className="logo" src={require('../logo.png')}/>
          <Menu.Item key="Home">
            <Icon type="appstore" /> Home
          </Menu.Item>
          <Menu.Item key="Login">
            <Icon type="key" theme="outlined" /> Login
          </Menu.Item>
          <Menu.Item key="Register">
            <Icon type="edit" theme="outlined" /> Register
          </Menu.Item>
        </Menu>

      </div>
    )
  }
}
