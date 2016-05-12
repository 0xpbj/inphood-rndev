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

class InPhoodNavigation extends Component {
  render() {
    return (
      <View style={styles.container}>
      { /* Documented here: 
              https://github.com/skv-headless/react-native-scrollable-tab-view 
              https://github.com/skv-headless/react-native-scrollable-tab-view/wiki/Custom-tab-bar
      */ } 
        <ScrollableTabView tabBarPosition="bottom" locked={false}>
          <InPhoodFBLogin tabLabel="Social" />
          <InPhoodCamera tabLabel="Camera" />
          <InPhoodCollage tabLabel="Collage" />
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
});

module.exports = InPhoodNavigation;