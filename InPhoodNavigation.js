'use strict';

var ScrollableTabView = require('react-native-scrollable-tab-view');
var InPhoodCamera = require('./InPhoodCamera');
var InPhoodFBLogin = require('./InPhoodFBLogin');
var InPhoodCollage = require('./InPhoodCollage');

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import FacebookTabBar from './FacebookTabBar';
import Icon from 'react-native-vector-icons/Ionicons';

class InPhoodNavigation extends Component {
  render() {
    return (
      <View style={styles.container}>

      { /* Documented here: 
              https://github.com/skv-headless/react-native-scrollable-tab-view 
              https://github.com/skv-headless/react-native-scrollable-tab-view/wiki/Custom-tab-bar
      */ } 

        <ScrollableTabView tabBarPosition="bottom" locked={false} renderTabBar={() => <FacebookTabBar /> }>

          <InPhoodFBLogin 
            tabLabel="ios-person-outline" 
            style={styles.tabView}
          />

          <InPhoodCamera
            tabLabel="ios-camera-outline"
            style={styles.tabView}
          />

          <InPhoodCollage
            tabLabel="ios-photos-outline"
            style={styles.tabView}
          />

        </ScrollableTabView>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
});

module.exports = InPhoodNavigation;