/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 /* @flow */

 'use strict';

var Camera = require("react-native-camera");
var CameraRollExample = require('./CameraRollExample');

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';

class InPhoodCamera extends Component {
  constructor(props) {
    super(props);
    // From: https://facebook.github.io/react/docs/reusable-components.html#no-autobinding
    this._takePicture = this._takePicture.bind(this);

    this.state = {cameraType: Camera.constants.Type.back};
  }

  _takePicture() {
    this.refs.cam.capture(function(err, data) {
      if (data) {
        this.props.onChange(
          data,
        );
      }
      else {
        alert('Camera Error!');
      }
    }.bind(this));
  }

  render() {
    return (
      <Camera
        ref="cam"
        style={styles.container}
        type={this.state.cameraType}>
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
  }
});

module.exports = InPhoodCamera;
