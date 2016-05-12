/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

const Firebase = require('firebase');
//var InPhoodNavigation = require('./InPhoodNavigation');

import {AppRegistry, } from 'react-native';
import InPhoodNavigation from './InPhoodNavigation';

AppRegistry.registerComponent('inPhoodRN', () => InPhoodNavigation);


/* I've commented out the navigation code below because it defeats the purpose of the whole ScrollableTabView.
  If we're going to go with the navigator approach below and push mode dialogs, then we might as well ditch ScrollableTabView
  and use Facebook's default layout/navigation/view system instead.  That said, there are a number of simple problems to resolve:

     1. TODO:  when the camera button takes a picture or a person logs in to FB, we call push.  That causes a crash; we need to hook
              into the ScrollableTabView's navigation controller/receiver and initiate a segue if desired.  Alternately, we could update
              status and show a check mark.  Lots of options.
*/

/*var InPhoodFBLogin = require('./InPhoodFBLogin');
var InPhoodCollage = require('./InPhoodCollage');
var InPhoodCamera = require('./InPhoodCamera')

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
          title: 'Camera',
          component: InPhoodCamera,
/*          title: 'Collage',
          component: InPhoodCollage,*/
/*          title: 'Login',
          component: InPhoodFBLogin,*/
/*        }}
      />
    );
  }
}
*/

/*
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
*/