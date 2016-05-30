/* @flow */

'use strict';

var ScrollableTabView = require('react-native-scrollable-tab-view');
var InPhoodFBLogin = require('./InPhoodFBLogin');
var InPhoodCamera = require('./InPhoodCamera');
var InPhoodCollage = require('./InPhoodCollage');
var InPhoodEmailLogin = require('./InPhoodEmailLogin');
// var InPhoodCaption = require('./InPhoodCaption');

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
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      image: '',
      caption: '',
      client: false,
      trainer: false,
    };
  }
  onUserLogin (token) {
    this.setState({
      token: token,
    });
  }
  onCaptureImage (photo) {
    this.setState({
      image: photo,
    });
  }
  onCaptionChange (caption) {
    this.setState({
      caption: caption,
    });
  }
  onSelectClient(flag) {
    this.setState({
      client: true,
      trainer: false
    });
  }
  onSelectTrainer(flag) {
    this.setState({
      client: false,
      trainer: true
    });
  }
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
            onChange={this.onUserLogin.bind(this)}
            client={this.state.client}
            trainer={this.state.trainer}
            onSelectClient={this.onSelectClient.bind(this)}
            onSelectTrainer={this.onSelectTrainer.bind(this)}
          />

          <InPhoodCamera
            tabLabel="ios-camera-outline"
            style={styles.tabView}
            onChange={this.onCaptureImage.bind(this)}
          />

          {/*<InPhoodCaption
            tabLabel="ios-message-outline"
            style={styles.tabView}
            onChange={this.onCaptionChange.bind(this)}
          />*/}

          <InPhoodCollage
            tabLabel="ios-photos-outline"
            style={styles.tabView}
            token={this.state.token}
            image={this.state.image}
            caption={this.state.caption}
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
