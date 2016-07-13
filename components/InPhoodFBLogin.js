/* @flow */

'use strict';

import React, { Component } from "react";
import {AppRegistry, StyleSheet, Text, TouchableHighlight, View, Image} from "react-native";

import Icon from 'react-native-vector-icons/Ionicons';

var InPhoodCamera = require('./InPhoodCamera');

const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
  LoginButton,
  LoginManager,
  AccessToken,
  Profile,
} = FBSDK;

var config = {
    apiKey: "AIzaSyCDzrz6xKXMUqsirFLVyzXKQDR7zOlkZTA",
    authDomain: "shining-torch-3197.firebaseapp.com",
    databaseURL: "https://shining-torch-3197.firebaseio.com",
    storageBucket: "shining-torch-3197.appspot.com",
  };
import firebase from 'firebase'
  require("firebase/app");
  require("firebase/auth");
  require("firebase/database");

class InPhoodFBLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
      token: '',
      id: '',
      name: '',
      gender: '',
      credential: '',
    };
    this._responseInfoCallback = this._responseInfoCallback.bind(this);
    this._handleEmailLogin = this._handleEmailLogin.bind(this);
    this._handleChangePage = this._handleChangePage.bind(this);
    this.handleCleanup = this.handleCleanup.bind(this);
    this.handleTokenChange = this.handleTokenChange.bind(this);
    // this.handleFirebaseLogin = this.handleFirebaseLogin.bind(this);
  }

  handleTokenChange (token) {
    this.setState({
      token: token
    });
  }

  handleCleanup() {
    this.setState({
      profile: '',
      token: '',
      id: '',
      name: '',
      gender: '',
    });
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      alert('Logged out.');
    }, function(error) {
      // An error happened.
    });
  }

  //Create response callback.
  _responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    }
    else {
      //Create response callback.
      // console.log(result);
      if (this.state.token) {
        let credential = firebase.auth.FacebookAuthProvider.credential(
                      this.state.token);
        firebase.auth().signInWithCredential(credential)
        .catch(function(error) {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          // The email of the user's account used.
          let email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          let credential = error.credential;
          // [START_EXCLUDE]
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            // console.error(error);
          }
          // [END_EXCLUDE]
        });
        this.setState({
          profile: result.picture.data.url,
          id: result.id,
          name: result.name,
          gender: result.gender,
          credential: credential,
        }, function(){
          this.props.navigator.push({
            title: 'Camera',
            component: InPhoodCamera,
            passProps: {
              token: this.state.token,
              id: this.state.id,
              profile: this.state.profile,
              photo: this.props.photo,
              image: this.props.image,
              caption: this.props.caption,
              name: this.state.name,
              gender: this.state.gender,
            }
          })
        });
      }
      else {
        alert ('Please login.')
      }
    }
  }

  _handleEmailLogin() {
    alert ("Email login is not supported yet.")
    // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    //   // Handle Errors here.
    //   console.log('Email errors: ' + error)
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // ...
    // });
  }

  _handleChangePage() {
    AccessToken.getCurrentAccessToken()
    .then(
      (token) => {
        this.handleTokenChange(token.accessToken.toString())
        const infoRequest = new GraphRequest(
          '/me?fields=id,email,gender,birthday,first_name,last_name,name,picture.type(normal)',
          null,
          this._responseInfoCallback
        );
        // Start the graph request.
        const graphManager = new GraphRequestManager();
        graphManager.addRequest(infoRequest);
        graphManager.start();
      }
    );
  }

  componentDidMount() {
    firebase.initializeApp(config)
    AccessToken.getCurrentAccessToken()
    .then(
      (token) => {
        this.handleTokenChange(token.accessToken.toString())
        const infoRequest = new GraphRequest(
          '/me?fields=id,email,gender,birthday,first_name,last_name,name,picture.type(normal)',
          null,
          this._responseInfoCallback
        );
        // Start the graph request.
        const graphManager = new GraphRequestManager();
        graphManager.addRequest(infoRequest);
        graphManager.start();
      }
    );
  }

  render() {
    return (

        <Image source={require('./img/LaunchRetina4_High.png')} style={styles.containerImage}>
          <View style={styles.quarterHeightContainer}/>
          <View style={styles.quarterHeightContainer}/>
          <View style={styles.quarterHeightContainer}/>
          <View style={styles.quarterHeightContainer}>
            <Image
              source={{uri: this.state.profile}}
              style={styles.profileImage}
            />

            <View style={styles.buttonRowStyle}>

              <View style={[{height: 30},
                            {width: 30},
                            {margin: 5},
                          ]}/>
              {/*<TouchableHighlight
                onPress={this._handleEmailLogin}
                underlayColor='white'
              >
                <Icon
                  name="ios-mail"
                  size={30}
                  color="#3b5998"
                  style={styles.marginStyle}
                />
              </TouchableHighlight>*/}

              <View style={styles.marginStyle}>
              <LoginButton
               onLoginFinished={(error, result) => {
                 if (error) {
                   alert('Error logging in.');
                 }
                 else {
                   if (result.isCanceled) {
                     alert('Login cancelled.');
                   } else {
                     AccessToken.getCurrentAccessToken()
                     .then(
                       (token) => {
                         this.handleTokenChange(token.accessToken.toString())
                         // Create a graph request asking for user information with a callback to handle the response.
                         const infoRequest = new GraphRequest(
                           '/me?fields=id,email,gender,birthday,first_name,last_name,name,picture.type(normal)',
                           null,
                           this._responseInfoCallback
                         );
                         // Start the graph request.
                         const graphManager = new GraphRequestManager();
                         graphManager.addRequest(infoRequest);
                         graphManager.start();
                       }
                     )
                   }
                 }
               }}
                 onLogoutFinished={() => {this.handleCleanup()}}
                 readPermissions={["email", "user_friends", "user_birthday", "user_photos", "public_profile"]}
                 publishPermissions={['publish_actions']}
               />
              </View>

              <TouchableHighlight
                onPress={this._handleChangePage}
                underlayColor='white'
              >
                <Icon
                  name="ios-camera"
                  size={45}
                  color="#3b5998"
                  style={styles.marginStyle}
                />
              </TouchableHighlight>

            </View>

          </View>

        </Image>

    );
  }
};

const styles = StyleSheet.create({
  quarterHeightContainer: {
    flex: 0.25,
    alignItems: 'center',
  },
  containerImage: {
    flex: 1,
    resizeMode: 'contain',
    //  The null assignments below causes the renderer to re-determine size (which was broken
    // when the push direct to the camera view was implemented).
    height: null,
    width: null,
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#3b5998',
    // marginBottom: 10,
  },
  buttonRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttonColumnStyle: {
    flex: 1,
    alignItems: 'center'
  },
  marginStyle: {
    margin: 5,
  },
});

module.exports = InPhoodFBLogin;
