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

var FBSDKLogin = require('react-native-fbsdklogin');
var {
  FBSDKLoginButton,
} = FBSDKLogin;

var FBSDKCore = require('react-native-fbsdkcore');
var {
  FBSDKAccessToken,
  FBSDKProfile,
} = FBSDKCore;

class InPhoodFBLogin extends Component {
  handleChange (token) {
    this.props.onChange(
      token,
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./img/LaunchRetina4.png')} style={styles.containerImage}>
          <View style={styles.flexThreeStyle}>
          </View>
          <View style={styles.flexOneStyle}>
            <FBSDKLoginButton
              onLoginFinished={(error, result) => {
                if (error) {
                  alert('Error logging in.');
                }
                else {
                  if (result.isCanceled) {
                    alert('Login cancelled.');
                  } else {
                    FBSDKAccessToken.getCurrentAccessToken((token) => this.handleChange(token));
                  }
                }
              }}
              onLogoutFinished={() => alert('Logged out.')}
              readPermissions={[]}
              publishPermissions={['publish_actions']}
            />
          </View>
        </Image>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  flexThreeStyle: {
    flex: 7,
  },
  flexOneStyle: {
    flex: 1,
  },
  facebookButtonStyle: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
  },
  containerImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 1136,
    width: 640,
    resizeMode: 'contain',
  },
  container: {
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
  },
});

module.exports = InPhoodFBLogin;
