/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Registration from './app/registration'
import Login from './app/login'
import Navigation from './app/navigation'

export default class SpendingApp extends Component {
  render() {
    return(
       <Navigation />
    )
  }
}

AppRegistry.registerComponent('SpendingApp', () => SpendingApp);
