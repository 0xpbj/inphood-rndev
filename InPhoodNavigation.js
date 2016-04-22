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
      <ScrollableTabView>
        <InPhoodFBLogin tabLabel="Social" />
        <InPhoodCamera tabLabel="Camera" />
        <InPhoodCollage tabLabel="Collage" />
      </ScrollableTabView>
    );
  }
};

module.exports = InPhoodNavigation;