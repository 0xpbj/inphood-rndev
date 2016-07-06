/* @flow */

'use strict';
import React, {Component} from 'react';
import {AppRegistry, Text, View, AsyncStorage, Navigator} from 'react-native';

import Signup from './Signup';
import Account from './Account';

import Header from './Header';

import Firebase from 'firebase';

let app = new Firebase("https://shining-torch-3197.firebaseio.com/");

import styles from './styles/common-styles.js';

class InPhoodEmailLogin extends Component {
  constructor(props){
    super(props);
    this.state = {
      component: null,
      loaded: false
    };
  }

  componentWillMount(){
    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      let component = {component: Signup};
      if(user_data != null){
        app.authWithCustomToken(user_data.token, (error, authData) => {
          if(error){
            this.setState(component);
          }else{
            this.setState({component: Account});
          }
        });
      }else{
        this.setState(component);
      }
    });
  }
  
  render(){
    if(this.state.component){
      return (
        <Navigator
          initialRoute={{component: this.state.component}}
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            if(route.component){
              return React.createElement(route.component, { navigator });
            }
          }}
        />
      );
    }else{
      return (
        <View style={styles.container}>
          <Header text="React Native Firebase Auth" loaded={this.state.loaded} />
          <View style={styles.body}></View>
        </View>
      );
    }
  }
}

module.exports = InPhoodEmailLogin;
