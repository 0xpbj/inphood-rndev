/* @flow */

'use strict';

import React, { Component } from "react";
import {AppRegistry, StyleSheet, Text, TouchableHighlight, View, NavigatorIOS} from "react-native";

var InPhoodFBLogin = require('./InPhoodFBLogin');

class InPhoodNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      profile: '',
      id: '',
      photo: '',
      image: '',
      caption: '',
      client: false,
      trainer: false,
      navBarHidden: true,
    };
  }

  propTypes: {
    token: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    profile: React.PropTypes.object.isRequired,
    photo: React.PropTypes.object,
    image: React.PropTypes.object,
    caption: React.PropTypes.string,
    client: React.PropTypes.bool.isRequired,
    trainer: React.PropTypes.bool.isRequired,
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUpdate() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <NavigatorIOS
          initialRoute={{
            component: InPhoodFBLogin,
            title: 'Login',
            passProps: {
              token: this.state.token,
              id: this.state.id,
              profile: this.state.profile,
              client: this.state.client,
              trainer: this.state.trainer,
              photo: this.state.photo,
              image: this.state.image,
              caption: this.state.caption,
            },
          }}
          tabLabel="ios-person-outline"
          style={styles.tabView}
          navigationBarHidden={this.state.navBarHidden}
        />
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
