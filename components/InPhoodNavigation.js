/* @flow */

'use strict';

var ScrollableTabView = require('react-native-scrollable-tab-view');
var InPhoodFBLogin = require('./InPhoodFBLogin');
var InPhoodCamera = require('./InPhoodCamera');
var InPhoodCollage = require('./InPhoodCollage');
var InPhoodEmailLogin = require('./InPhoodEmailLogin');
var CameraRollExample = require('./CameraRollExample');

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  NavigatorIOS
} from 'react-native';

import FacebookTabBar from './FacebookTabBar';
import Icon from 'react-native-vector-icons/Ionicons';

class InPhoodNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      profile: '',
      image: '',
      caption: '',
      client: false,
      trainer: false,
    };
  }

  propTypes: {
    token: React.PropTypes.string.isRequired,
    profile: React.PropTypes.object.isRequired,
    image: React.PropTypes.object,
    caption: React.PropTypes.string,
    client: React.PropTypes.bool.isRequired,
    trainer: React.PropTypes.bool.isRequired,
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   return nextProps.id !== this.props.id;
  // }

  componentWillUpdate() {

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  onUserLogin (token) {
    this.setState({
      token: token,
    });
  }
  onProfile (data) {
    this.setState({
      profile: data,
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
    console.disableYellowBox = true;
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
            onProfileChange={this.onProfile.bind(this)}
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

          <CameraRollExample
            tabLabel="ios-photos-outline"
            style={styles.tabView}
          />

          {/*<NavigatorIOS
            initialRoute={{
              component: CameraRollExample,
              title: 'Photo Library',
              passProps: {
                token: '',
              },
            }}
            tabLabel="ios-photos-outline"
            style={styles.tabView}
          />*/}
{/*
          <CameraRollExample
            tabLabel="ios-photos-outline"
            style={styles.tabView}
            token={this.state.token}
            image={this.state.image}
            caption={this.state.caption}
          />*/}

          {/*<InPhoodCollage
            tabLabel="ios-photos-outline"
            style={styles.tabView}
            token={this.state.token}
            image={this.state.image}
            caption={this.state.caption}
          />*/}

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
