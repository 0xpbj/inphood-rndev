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

var Button = require('./Button');
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

class InPhoodFBLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
    };
    this._responseInfoCallback = this._responseInfoCallback.bind(this);
    this._handleChangePage = this._handleChangePage.bind(this);
  }

  handleTokenChange (token) {
    this.props.onChange(
      token,
    );
  }

  handleCleanup() {
    this.props.onProfileChange(
      '',
    );
    this.setState({
      profile: '',
    });
  }

  //Create response callback.
  _responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    }
    else {
      this.props.onProfileChange(
        result,
      );
      this.setState({
        profile: result.picture.data.url,
      });
      this.props.navigator.push({
        title: 'Camera',
        component: InPhoodCamera,
        passProps: {
          onChange: this.props.onCameraChange,
          token: this.props.token,
          image: this.props.image,
          caption: this.props.caption,
        }
      });
    }
  }

  _handleChangePage() {
    this.props.navigator.push({
      title: 'Camera',
      component: InPhoodCamera,
      passProps: {
        onChange: this.props.onCameraChange,
        token: this.props.token,
        image: this.props.image,
        caption: this.props.caption,
      }
    });
  }

  componentDidMount() {
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
        <TouchableHighlight onPress={this._handleChangePage}>
          <Icon name="ios-camera" size={30} color="#4F8EF7" style={{marginLeft: 240}}/>
        </TouchableHighlight>
        <Image source={require('./img/LaunchRetina4.png')} style={styles.containerImage}>
          <View style={styles.flexThreeStyle}>
          </View>
          {/*Commenting this out for now*/}
          {/*<View style={styles.flexTwoStyle}>
            <Button
              onPress={this.props.onSelectClient.bind(this)}
              active={this.props.client}
              style={styles.modalButton}>
              Client
            </Button>
            <Button
              onPress={this.props.onSelectTrainer.bind(this)}
              active={this.props.trainer}
              style={styles.modalButton}>
              Trainer
            </Button>
          </View>*/}
          <Image
            source={{uri: this.state.profile}}
            style={{
              width: 60,
              height: 60,
              marginBottom: 10,
              borderRadius: 30,
              // backgroundColor: 'transparent',
              // marginRight: 10,
            }}
          />
          <View style={styles.flexOneStyle}>
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
              onLogoutFinished={
                () => {
                  alert('Logged out.')
                  this.handleCleanup()
                }
              }
              readPermissions={["email", "user_friends", "user_birthday", "user_photos"]}
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
  flexTwoStyle: {
    flex: 2,
    paddingBottom: 80,
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
  modalButton: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#009DDD",
    justifyContent: 'flex-end',
    marginLeft: 240,
  },
  buttonText: {
    color: "#fff"
  },
});

module.exports = InPhoodFBLogin;
