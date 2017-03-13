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

export default class SpendingApp extends Component {
  render() {
    return(
       <Registration />
    )
  }
}

AppRegistry.registerComponent('SpendingApp', () => SpendingApp);
