/* @flow */

'use strict';

var InPhoodFBLogin = require('./InPhoodFBLogin');

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  NavigatorIOS
} from 'react-native';

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
      navBarHidden: true,
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
        <NavigatorIOS
          initialRoute={{
            component: InPhoodFBLogin,
            title: 'Login',
            passProps: {
              onChange: this.onUserLogin.bind(this),
              onProfileChange: this.onProfile.bind(this),
              client: this.state.client,
              trainer: this.state.trainer,
              onSelectClient: this.onSelectClient.bind(this),
              onSelectTrainer: this.onSelectTrainer.bind(this),
              navBarHidden: this.state.navBarHidden,
              onCameraChange: this.onCaptureImage.bind(this),
              token: this.state.token,
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
