import React, {Component} from 'react';

import {StyleSheet, Text, View, StatusBar, TouchableOpacity} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {Nav} from './Navigation'

export default class Home extends Component < {} > {

  render() {
    return (<Nav/>)
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
