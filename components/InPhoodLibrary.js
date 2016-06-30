/* @flow */

'use strict';

import React, {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    CameraRoll,
    TouchableHighlight,
    NativeModules,
    Component
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

var InPhoodImage = require('./InPhoodImage');

class InPhoodLibrary extends Component {
  // https://thebhwgroup.com/blog/accessing-iphone-camera-roll-images-react-native
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selected: "",
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
      this.props.onSelectImage(
        image,
      );
      this.props.navigator.push({
        title: 'PhoodImage',
        component: InPhoodImage,
        passProps: {
          onCaptionChange: this.props.onCaptionChange,
          token: this.props.token,
          profile: this.props.profile,
          client: this.props.client,
          trainer: this.props.trainer,
          photo: this.props.photo,
          image: this.state.selected,
          caption: this.props.caption,
        }
      });
    });
  }

  _handleBackPage() {
    this.props.navigator.pop();
  }

  _handleFwdPage() {
    this.props.navigator.push({
      title: 'PhoodImage',
      component: InPhoodImage,
      passProps: {
        onCaptionChange: this.props.onCaptionChange,
        token: this.props.token,
        profile: this.props.profile,
        client: this.props.client,
        trainer: this.props.trainer,
        photo: this.props.photo,
        image: this.state.selected,
        caption: this.props.caption,
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.threeQuarterHeightContainer}>

          <View style={styles.imageGrid}>
          { this.state.images.map((image) => {
            return (
              <TouchableHighlight onPress={this.selectImage.bind(null, image.uri)}>
                <Image style={styles.image} source={{ uri: image.uri }} />
              </TouchableHighlight>
            );
            })
          }
          </View>

        </ScrollView>


        <View style={styles.quarterHeightContainer}>

          {/*Placeholder to match buttonbar height in start/login page.*/}
          <View style={{height:60}}/>

          <View style={styles.buttonRowStyle}>

            <TouchableHighlight onPress={this._handleBackPage}>
              <Icon
                name="ios-camera"
                size={30}
                color="#3b5998"
                style={styles.marginStyle}
              />
            </TouchableHighlight>

            <TouchableHighlight onPress={this._handleFwdPage}>
              <Icon
                name="ios-paper"
                size={30}
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
  threeQuarterHeightContainer: {
    flex: 0.75,
  },
  quarterHeightContainer: {
    flex: 0.25,
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
