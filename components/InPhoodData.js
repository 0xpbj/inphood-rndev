/* @flow */

'use strict';

import React, { Component } from "react";
import {AppRegistry, StyleSheet, Text, TextInput, TouchableHighlight, View, Image} from "react-native";

import Icon from 'react-native-vector-icons/Ionicons';

class InPhoodData extends Component {
  constructor(props) {
    super(props);
    this._handleBackPage = this._handleBackPage.bind(this);
  }
  componentDidMount() {
    // console.log(this)
  }
  _handleBackPage() {
    this.props.navigator.pop();
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.largeContainer}>

          <View style={styles.borderStyle}>

            {/*Horrible workaround for React bug (radius of border reveals
            current backgroundColor instead of parent backgroundColor: )*/}
            {/*<Text style={styles.textBarStyle}>
              Firebase Data Transmitted!
            </Text>*/}
            <TextInput
              autoCapitalize="none"
              placeholder="Firebase Data Transmitted!"
              returnKeyType="done"
              style={styles.textBarStyle}
              editable="false"
            />

            <Image
              style={styles.image}
              source={{uri: this.props.image}}
            />

          </View>

        </View>

        <View style={styles.smallContainer}>

          {/*<Image
            source={{uri: this.props.profile}}
            style={{
              width: 60,
              height: 60,
              marginBottom: 10,
              borderRadius: 30,
              // backgroundColor: 'transparent',
              // marginRight: 10,
            }}
          />*/}

          <TouchableHighlight
            onPress={this._handleBackPage}
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
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  largeContainer: {
    flex: 0.85,
  },
  borderStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#3b5998',
    flex: 1,
    backgroundColor: 'black'
  },
  image: {
    flex: 1,
    // height: 200,
    resizeMode: 'cover',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#3b5998',
    margin: 5,
    backgroundColor: 'black',
  },
  textBarStyle: {
    fontFamily: 'Helvetica',
    height: 26,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#3b5998',
    backgroundColor: 'white',
    // flex: 1,
    fontSize: 13,
    padding: 4,
    margin: 5,
  },

  smallContainer: {
    flex: 0.15,
    alignItems: 'center',
  },
  marginStyle: {
    margin: 5,
  },
});

module.exports = InPhoodData;
