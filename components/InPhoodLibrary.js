/* @flow */

'use strict';

import React, { Component } from "react";
import {AppRegistry, StyleSheet, Text, TextInput, TouchableHighlight, View, Image, CameraRoll, NativeModules, ScrollView} from "react-native";

import Icon from 'react-native-vector-icons/Ionicons';

var InPhoodImage = require('./InPhoodImage');

class InPhoodLibrary extends Component {
  // https://thebhwgroup.com/blog/accessing-iphone-camera-roll-images-react-native
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selected: '',
    };
    this.storeImages = this.storeImages.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this._handleBackPage = this._handleBackPage.bind(this);
    this._handleFwdPage = this._handleFwdPage.bind(this);
  }

  componentDidMount() {
    const fetchParams = {
      first: 25,
    };
    // CameraRoll.getPhotos(fetchParams, this.storeImages, this.logImageError);
    CameraRoll.getPhotos(fetchParams)
    .then(
      (data) => this.storeImages(data),
      (e) => logError(e)
    );
  }

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map(
      (asset) => asset.node.image
    );
    this.setState({
      images: images,
    });
  }

  logImageError(err) {
    console.log(err);
  }

  selectImage(uri) {
    NativeModules.ReadImageData.readImage(uri, (image) => {
      this.setState({
        selected: uri,
      });
      this.props.navigator.push({
        title: 'PhoodImage',
        component: InPhoodImage,
        passProps: {
          token: this.props.token,
          id: this.props.id,
          profile: this.props.profile,
          client: this.props.client,
          trainer: this.props.trainer,
          photo: this.props.photo,
          image: this.state.selected,
          caption: this.props.caption,
          name: this.props.name,
          gender: this.props.gender,
        }
      });
    });
  }

  _handleBackPage() {
    this.props.navigator.pop();
  }

  _handleFwdPage() {
    if (this.state.selected) {
      this.props.navigator.push({
        title: 'PhoodImage',
        component: InPhoodImage,
        passProps: {
          token: this.props.token,
          id: this.props.id,
          profile: this.props.profile,
          client: this.props.client,
          trainer: this.props.trainer,
          photo: this.props.photo,
          image: this.state.selected,
          caption: this.props.caption,
          name: this.props.name,
          gender: this.props.gender,
        }
      });
    }
    else {
      alert('Please select a image.')
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.largeContainer}>

          <View style={styles.imageGrid}>
          { this.state.images.map((image) => {
            return (
              <TouchableHighlight
                onPress={this.selectImage.bind(null, image.uri)}
                underlayColor='black'
              >
                <Image style={styles.image} source={{ uri: image.uri }} />
              </TouchableHighlight>
            );
            })
          }
          </View>

        </ScrollView>


        <View style={styles.smallContainer}>

          {/*Placeholder to match buttonbar height in start/login page.*/}
          {/*<View style={{height:60}}/>*/}

          <View style={styles.buttonRowStyle}>

            <TouchableHighlight
              onPress={this._handleBackPage}
              underlayColor='white'
            >
              <Icon
                name="ios-camera"
                size={45}
                color="#3b5998"
                style={styles.marginStyle}
              />
            </TouchableHighlight>

            <TouchableHighlight
              onPress={this._handleFwdPage}
              underlayColor='white'
            >
              <Icon
                name="ios-paper"
                size={45}
                color="#3b5998"
                style={styles.marginStyle}
              />
            </TouchableHighlight>

          </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  largeContainer: {
    flex: 0.85,
    borderColor: "#3b5998",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  smallContainer: {
    flex: 0.15,
    alignItems: 'center',
  },
  buttonRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    borderWidth: 1,
    borderColor: "#3b5998",
    borderRadius: 50,
  },
  marginStyle: {
    margin: 5,
  }
});

module.exports = InPhoodLibrary;
