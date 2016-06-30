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
      token: '',
      client: false,
      trainer: false,
    };
    this._responseInfoCallback = this._responseInfoCallback.bind(this);
    this._handleChangePage = this._handleChangePage.bind(this);
    this.selectClient = this.selectClient.bind(this);
    this.selectTrainer = this.selectTrainer.bind(this);
  }

  selectClient () {
    AccessToken.getCurrentAccessToken()
    .then(
      (token) => {
        if (!token) {
          alert("Please Login")
          console.log(token)
        }
        else {
          this.props.onSelectClient();
          this.setState({
            client: true,
            trainer: false,
          });
          this.props.navigator.push({
            title: 'Camera',
            component: InPhoodCamera,
            passProps: {
              onCaptureImage: this.props.onCaptureImage,
              onSelectImage: this.props.onSelectImage,
              onCaptionChange: this.props.onCaptionChange,
              token: this.state.token,
              profile: this.state.profile,
              client: this.state.client,
              trainer: this.state.trainer,
              photo: this.props.photo,
              image: this.props.image,
              caption: this.props.caption,
            }
          });
        }
      }
    );
  }

  selectTrainer () {
    AccessToken.getCurrentAccessToken()
    .then(
      (token) => {
        if (!token) {
          alert("Please Login")
          console.log(token)
        }
        else {
          this.props.onSelectTrainer();
          this.setState({
            client: false,
            trainer: true,
          });
          this.props.navigator.push({
            title: 'Camera',
            component: InPhoodCamera,
            passProps: {
              onCaptureImage: this.props.onCaptureImage,
              onSelectImage: this.props.onSelectImage,
              onCaptionChange: this.props.onCaptionChange,
              token: this.state.token,
              profile: this.state.profile,
              client: this.state.client,
              trainer: this.state.trainer,
              photo: this.props.photo,
              image: this.props.image,
              caption: this.props.caption,
            }
          });
        }
      }
    );
  }

  handleTokenChange (token) {
    this.props.onLogin(
      token,
    );
    this.setState({
      token: token
    });
  }

  handleCleanup() {
    this.props.onProfile(
      '',
    );
    this.props.onLogin(
      '',
    );
    this.setState({
      profile: '',
      token: '',
      client: false,
      trainer: false,
    });
  }

  //Create response callback.
  _responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    }
    else {
      this.props.onProfile(
        result,
      );
      this.setState({
        profile: result.picture.data.url,
      });
    }
  }

  _handleChangePage() {
    if (!this.state.client && !this.state.trainer) {
      alert("Please pick account type!")
    }
    else {
      this.props.navigator.push({
        title: 'Camera',
        component: InPhoodCamera,
        passProps: {
          onCaptureImage: this.props.onCaptureImage,
          onSelectImage: this.props.onSelectImage,
          onCaptionChange: this.props.onCaptionChange,
          token: this.state.token,
          profile: this.state.profile,
          client: this.state.client,
          trainer: this.state.trainer,
          photo: this.props.photo,
          image: this.props.image,
          caption: this.props.caption,
        }
      });
    }
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
        <Image source={require('./img/LaunchRetina4_High.png')} style={styles.containerImage}>

          <View style={styles.quarterHeightContainer}>
            <View style={[
                          {flexDirection: 'row'},
                          {justifyContent: 'flex-start'},
                          {alignItems: 'flex-start'}
                        ]}>

                <TouchableHighlight onPress={() => {this.selectClient()}}>
                  <Icon
                    name="ios-shirt"
                    size={30}
                    color="rgba(59,89,152,0.20)"
                  />
                </TouchableHighlight>

                <TouchableHighlight onPress={() => {this.selectTrainer()}}>
                  <Icon
                    name="ios-clipboard"
                    size={30}
                    color="rgba(59,89,152,0.20)"
                  />
                </TouchableHighlight>

                <View style={[
                  {height: 30},
                  {flex: 1}
                ]}/>

            </View>
          </View>


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

              <TouchableHighlight
                onPress={this._handleChangePage}
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

        </Image>
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
