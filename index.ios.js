/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
var Camera = require("react-native-camera");

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';


class inPhoodRN extends Component {
  constructor() {
    super();

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
      console.log(err, data);
    });
  }

  render() {
    return (

      <Camera
        ref="cam"
        style={styles.container}
        type={this.state.cameraType}>
        <View style={styles.buttonBar}>
          <TouchableHighlight style={styles.button} onPress={this._switchCamera}>
            <Text style={styles.buttonText}>Flip</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._takePicture}>
            <Text style={styles.buttonText}>Take</Text>
          </TouchableHighlight>
        </View>
      </Camera>
/*
      <View style={styles.container}>
        <Text style={styles.welcome}>
         inPhood! 
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>*/
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

  /*container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },*/
});

AppRegistry.registerComponent('inPhoodRN', () => inPhoodRN);
