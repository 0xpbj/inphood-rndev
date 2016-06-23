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
        selected: image,
      });
    });
    this.props.navigator.push({
      title: 'PhoodImage',
      component: InPhoodImage,
      passProps: {image: uri}
    });
  }

  _handleBackPage() {
    this.props.navigator.pop();
  }

  _handleFwdPage() {
    this.props.navigator.push({
      title: 'PhoodImage',
      component: InPhoodImage,
      passProps: {}
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableHighlight onPress={this._handleBackPage}>
          <Icon name="ios-camera" size={30} color="#4F8EF7" style={{marginRight: 240}}/>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._handleFwdPage}>
          <Icon name="ios-paper" size={30} color="#4F8EF7" style={{marginLeft: 240}}/>
        </TouchableHighlight>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

module.exports = InPhoodLibrary;
