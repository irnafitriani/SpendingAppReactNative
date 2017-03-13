/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Registration from './app/components/registration'
import Login from './app/componnets/login'

export default class SpendingApp extends Component {
  render() {
    return(
       <Login />
    )
  }
}

AppRegistry.registerComponent('SpendingApp', () => SpendingApp);
