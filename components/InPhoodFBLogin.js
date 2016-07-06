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
var firebase = require("firebase/app");
  require("firebase/auth");
  require("firebase/database");
var provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('id');
provider.addScope('first_name');
provider.addScope('last_name');
provider.addScope('name');
provider.addScope('picture.type(normal)');
provider.addScope('email');
provider.addScope('gender');
provider.addScope('birthday');

class InPhoodFBLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
      token: '',
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

  // handleFirebaseLogin() {
  //   console.log("Login Function")
  //   firebase.auth().signInWithPopup(provider).then(function(result) {
  //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //     var token = result.credential.accessToken;
  //     console.log(token);
  //     // The signed-in user info.
  //     var user = result.user;
  //     console.log(user);
  //     this.setState({
  //       profile: result.picture.data.url,
  //       id: result.id
  //     });
  //
  //     this.props.navigator.push({
  //       title: 'Camera',
  //       component: InPhoodCamera,
  //       passProps: {
  //         onCaptureImage: this.props.onCaptureImage,
  //         onSelectImage: this.props.onSelectImage,
  //         onCaptionChange: this.props.onCaptionChange,
  //         token: this.state.token,
  //         id: this.state.id,
  //         profile: this.state.profile,
  //         client: true,
  //         trainer: false,
  //         photo: this.props.photo,
  //         image: this.props.image,
  //         caption: this.props.caption,
  //       }
  //     });
  //   }).catch(function(error) {
  //     // Handle Errors here.
  //     console.log(error);
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // The email of the user's account used.
  //     var email = error.email;
  //     // The firebase.auth.AuthCredential type that was used.
  //     var credential = error.credential;
  //     // ...
  //   });
  // }

  handleCleanup() {
    this.setState({
      profile: '',
      id: '',
      token: '',
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
      var credential = firebase.auth.FacebookAuthProvider.credential(
                    this.state.token);
      console.log(credential)
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // Handle Errors here.
        console.log('In error console');
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // [START_EXCLUDE]
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
        // [END_EXCLUDE]
      });
      this.setState({
        profile: result.picture.data.url,
        id: result.id
      });

      this.props.navigator.push({
        title: 'Camera',
        component: InPhoodCamera,
        passProps: {
          onCaptureImage: this.props.onCaptureImage,
          onSelectImage: this.props.onSelectImage,
          onCaptionChange: this.props.onCaptionChange,
          token: this.state.token,
          id: this.state.id,
          profile: this.state.profile,
          client: true,
          trainer: false,
          photo: this.props.photo,
          image: this.props.image,
          caption: this.props.caption,
        }
      });
    }
  }

  _handleEmailLogin() {
    // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    //   // Handle Errors here.
    //   console.log('Email errors: ' + error)
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // ...
    // });
  }

  _handleChangePage() {
    this.props.navigator.push({
      title: 'Camera',
      component: InPhoodCamera,
      passProps: {
        onCaptureImage: this.props.onCaptureImage,
        onSelectImage: this.props.onSelectImage,
        onCaptionChange: this.props.onCaptionChange,
        token: this.state.token,
        id: this.state.id,
        profile: this.state.profile,
        client: true,
        trainer: false,
        photo: this.props.photo,
        image: this.props.image,
        caption: this.props.caption,
      }
    });
  }

  componentDidMount() {
    firebase.initializeApp(config)
    AccessToken.getCurrentAccessToken()
    .then(
      (token) => {
        this.handleTokenChange(token.accessToken.toString())
        const infoRequest = new GraphRequest(
          '/me?fields=id,first_name,last_name,name,picture.type(normal),email,gender,birthday',
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
      <View style={styles.container}>
        {/*<Image source={require('./img/LaunchRetina4_High.png')} style={styles.containerImage}>*/}
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
              <TouchableHighlight
                onPress={this._handleEmailLogin}
                underlayColor='white'
              >
                <Icon
                  name="ios-mail"
                  size={30}
                  color="#3b5998"
                  style={styles.marginStyle}
                />
              </TouchableHighlight>

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
                           '/me?fields=id,first_name,last_name,name,picture.type(normal),email,gender,birthday',
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
                 readPermissions={["email", "user_friends", "user_birthday", "user_photos"]}
                 publishPermissions={['publish_actions']}
               />
              </View>

              <TouchableHighlight
                onPress={this._handleChangePage}
                underlayColor='white'
              >
                <Icon
                  name="ios-camera"
                  size={30}
                  color="#3b5998"
                  style={styles.marginStyle}
                />
              </TouchableHighlight>

            </View>

          </View>

        {/*</Image>*/}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  quarterHeightContainer: {
    flex: 0.25,
    alignItems: 'center',
  },
  containerImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
