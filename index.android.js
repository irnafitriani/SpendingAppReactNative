/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';
import Registration from './app/components/registration'
import Login from './app/components/login'
import ForgotPassword from './app/components/forgotPassword'

export default class SpendingApp extends Component {
  constructor(props) {
    super(props)
  }

  navForward(route) {
    this.nav.push({
      name: route.name
    })
  }

  navBackward(route) {
    this.nav.pop()
  }

  renderScene(route, nav) {
    switch(route.name) {
      case 'login':
        return (
          <Login
            nav = {this.nav}
            navForward={this.navForward.bind(this)}
            navBackward={this.navBackward.bind(this)}
           />
        )
      case 'signup':
        return (
          <Registration
            nav = {this.nav}
          />
        )
      case 'forgotpassword':
        return (
          <ForgotPassword
            nav = {this.nav}
          />
        )

    }
  }

  configureScene() {
    return Navigator.SceneConfigs.FloatFromBottom;
  }

  render() {
    return (
      <Navigator
        configureScene={this.configureScene}
        initialRoute={{name: 'login', index: 0}}
        ref={((nav) => {
          this.nav = nav;
        })}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
}

AppRegistry.registerComponent('SpendingApp', () => SpendingApp);
