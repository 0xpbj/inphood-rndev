/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 /* @flow */

'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

var Camera = require("react-native-camera");
var InPhoodLibrary = require('./InPhoodLibrary');

class InPhoodCamera extends Component {
  constructor(props) {
    super(props);
    // From: https://facebook.github.io/react/docs/reusable-components.html#no-autobinding
    this._takePicture = this._takePicture.bind(this);
    this._handleBackPage = this._handleBackPage.bind(this);
    this._handleFwdPage = this._handleFwdPage.bind(this);

    this.state = {
      cameraType: Camera.constants.Type.back,
      photo: '',
    };
  }

  _takePicture() {
    this.refs.cam.capture(function(err, data) {
      if (data) {
        this.props.onCaptureImage(
          data,
        );
        this.setState({
          photo: data,
        });
        this.props.navigator.push({
          title: 'Collage',
          component: InPhoodLibrary,
          passProps: {
            onSelectImage: this.props.onSelectImage,
            onCaptionChange: this.props.onCaptionChange,
            token: this.props.token,
            profile: this.props.profile,
            client: this.props.client,
            trainer: this.props.trainer,
            photo: this.state.photo,
            image: this.props.image,
            caption: this.props.caption,
          }
        });
      }
      else {
        alert('Camera Error!');
      }
    }.bind(this));
  }

  _handleBackPage() {
    this.props.navigator.pop();
  }

  _handleFwdPage() {
    this.props.navigator.push({
      title: 'Collage',
      component: InPhoodLibrary,
      passProps: {
        onSelectImage: this.props.onSelectImage,
        onCaptionChange: this.props.onCaptionChange,
        token: this.props.token,
        profile: this.props.profile,
        client: this.props.client,
        trainer: this.props.trainer,
        photo: this.state.photo,
        image: this.props.image,
        caption: this.props.caption,
      }
    });
  }

  render() {
    return (
        <Camera
          ref="cam"
          style={styles.container}
          type={this.state.cameraType}>
          <TouchableHighlight onPress={this._handleBackPage}>
            <Icon name="ios-person" size={30} color="#4F8EF7" style={{marginRight: 240}}/>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._handleFwdPage}>
            <Icon name="ios-photos" size={30} color="#4F8EF7" style={{marginLeft: 240}}/>
          </TouchableHighlight>
          <View style={styles.buttonBar}>
            <TouchableHighlight style={styles.shutter603X} onPress={this._takePicture.bind(this)}>
              {/* Using Images:  https://facebook.github.io/react-native/docs/images.html -- density chosen automatically @2x vs. @3x */}
              <Image source={require('./img/shutterInvert60.png')} style={styles.shutter30}/>
              {/*<Text style={styles.buttonText}>Take</Text>*/}
            </TouchableHighlight>
          </View>
        </Camera>
    );
  }
}

const styles = StyleSheet.create({
  topButtons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  buttonBar: {
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
    right: 0,
    left: 0,
    justifyContent: "center"
  },
  button: {
    padding: 10,
    // color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    margin: 5
  },
  buttonText: {
    color: "#FFFFFF"
  },
  shutter30: {
    margin: 0,
    width: 30,
    height: 30,
    backgroundColor: 'black',
  },
});

module.exports = InPhoodCamera;
