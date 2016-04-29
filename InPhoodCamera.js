/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var Camera = require("react-native-camera");
var InPhoodCollage = require('./InPhoodCollage');

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class InPhoodCamera extends Component {
  constructor(props) {
    super(props);
    // From: https://facebook.github.io/react/docs/reusable-components.html#no-autobinding
    this._switchCamera = this._switchCamera.bind(this);
    this._takePicture = this._takePicture.bind(this);

    this.state = {cameraType: Camera.constants.Type.back};
  }

  _switchCamera() {
    this.state.cameraType = this.state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
    this.setState(this.state);

    console.log("In _switchCamera:");
    console.log("%s", this.state.cameraType)

  }

  _takePicture() {
    this.refs.cam.capture(function(err, data) {
      if (data) {
        console.log("Camera Props");
        console.log(this);
        this.setState({data: data});
        this.props.navigator.push({
          title: 'Collage',
          component: InPhoodCollage,
          passProps: {
                        userId: this.state.userId,
                        data: this.state.data
                     }
        });
      }
      else {
        alert('Camera Error!');
      }
    }.bind(this));
  }

  render() {
    //console.log(this);
    return (
      <Camera
        ref="cam"
        style={styles.container}
        type={this.state.cameraType}>
        <View style={styles.buttonBar}>
          <TouchableHighlight style={styles.button} onPress={this._switchCamera}>
            <Text style={styles.buttonText}>Flip</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._takePicture.bind(this)}>
            <Text style={styles.buttonText}>Take</Text>
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
  }
});

module.exports = InPhoodCamera;