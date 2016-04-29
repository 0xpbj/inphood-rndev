'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var InPhoodCamera = require('./InPhoodCamera');

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
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      data: '',
      message: ''
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <FBSDKLoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              alert('Error logging in.');
            } 
            else {
              if (result.isCanceled) {
                alert('Login cancelled.');
              } else {
                FBSDKAccessToken.getCurrentAccessToken((token) => {
                  console.log(token);
                  this.setState({userId: token.userId});
                  console.log(this);
                  this.props.navigator.push({
                    title: 'Camera',
                    component: InPhoodCamera,
                    passProps: {userId: this.state.userId, data: ''}
                  });
                });
              }
            }
          }}
          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={[]}
          publishPermissions={['publish_actions']}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
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