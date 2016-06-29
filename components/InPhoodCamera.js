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
        this.setState({
          photo: data,
        });
          console.log('\n\n\n Camera Data')
        this.props.navigator.push({
          title: 'Collage',
          component: InPhoodLibrary,
          passProps: {
            token: this.props.token,
            id: this.props.id,
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
    console.log('\n\n\n Camera Data')
    this.props.navigator.push({
      title: 'Collage',
      component: InPhoodLibrary,
      passProps: {
        token: this.props.token,
        id: this.props.id,
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

          <View style={styles.quarterHeightContainer}/>
          <View style={styles.quarterHeightContainer}/>
          <View style={styles.quarterHeightContainer}/>

          <View style={styles.quarterHeightContainer}>

            {/*Placeholder to match buttonbar height in start/login page.*/}
            <View style={{height:60}}/>

            <View style={styles.buttonRowStyle}>

              <TouchableHighlight onPress={this._handleBackPage}>
                <Icon
                  name="ios-person"
                  size={30}
                  color="#3b5998"
                  style={styles.marginStyle}
                />
              </TouchableHighlight>

              <TouchableHighlight style={styles.shutter603X} onPress={this._takePicture.bind(this)}>
                {/* Using Images:  https://facebook.github.io/react-native/docs/images.html -- density chosen automatically @2x vs. @3x */}
                <Image source={require('./img/shutterInvert60.png')} style={styles.shutter30}/>
                {/*<Text style={styles.buttonText}>Take</Text>*/}
              </TouchableHighlight>

              <TouchableHighlight onPress={this._handleFwdPage}>
                <Icon
                  name="ios-photos"
                  size={30}
                  color="#3b5998"
                  style={styles.marginStyle}
                />
              </TouchableHighlight>

            </View>

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
  quarterHeightContainer: {
    flex: 0.25,
    alignItems: 'center',
  },
  buttonRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  shutter30: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 35,
    marginLeft: 35,
    width: 30,
    height: 30,
    backgroundColor: 'black',
  },
  marginStyle: {
    margin: 5,
  }
});

module.exports = InPhoodCamera;
