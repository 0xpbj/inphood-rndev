/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

const Firebase = require('firebase');
var InPhoodNavigation = require('./InPhoodNavigation');
var InPhoodFBLogin = require('./InPhoodFBLogin');

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class InPhoodApp extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'InPhood Login',
          component: InPhoodFBLogin,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
});

AppRegistry.registerComponent('inPhoodRN', () => InPhoodApp);