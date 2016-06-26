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
    profile: React.PropTypes.object.isRequired,
    photo: React.PropTypes.object,
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

  onLogin (token) {
    this.setState({
      token: token,
    });
  }
  onProfile (profile) {
    this.setState({
      profile: profile,
    });
  }
  onCaptureImage (photo) {
    this.setState({
      photo: photo,
    });
  }
  onSelectImage (image) {
    this.setState({
      image: image,
    })
  }
  onCaptionChange (caption) {
    this.setState({
      caption: caption,
    });
  }
  onSelectClient() {
    this.setState({
      client: true,
      trainer: false
    });
  }
  onSelectTrainer() {
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
              onLogin: this.onLogin.bind(this),
              onProfile: this.onProfile.bind(this),
              onSelectClient: this.onSelectClient.bind(this),
              onSelectTrainer: this.onSelectTrainer.bind(this),
              onCaptureImage: this.onCaptureImage.bind(this),
              onSelectImage: this.onSelectImage.bind(this),
              onCaptionChange: this.onCaptionChange.bind(this),
              token: this.state.token,
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
