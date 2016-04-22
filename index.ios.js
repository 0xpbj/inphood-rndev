/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

var InPhoodNavigation = require('./InPhoodNavigation');

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
          title: 'LandingPage',
          component: InPhoodNavigation,
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