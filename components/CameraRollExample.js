/* @flow */

'use strict';

const React = require('react-native');

const {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    CameraRoll,
    TouchableHighlight,
    NativeModules,
} = React;

var InPhoodImage = require('./InPhoodImage');

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
    buttonNavLeft: {
      backgroundColor: "#009DDD",
      justifyContent: 'flex-end',
      marginRight: 240,
    },
    buttonNavRight: {
      backgroundColor: "#009DDD",
      justifyContent: 'flex-end',
      marginLeft: 240,
    },
    buttonTextNav: {
      color: "#fff"
    }
});

const CameraRollExample = React.createClass({
    // https://thebhwgroup.com/blog/accessing-iphone-camera-roll-images-react-native
    getInitialState() {
      return {
        images: [],
        selected: '',
      };
    },

    componentDidMount() {
      const fetchParams = {
        first: 25,
      };
      CameraRoll.getPhotos(fetchParams, this.storeImages, this.logImageError);
    },

    storeImages(data) {
      const assets = data.edges;
      const images = assets.map((asset) => asset.node.image);
      this.setState({
        images: images,
      });
    },

    logImageError(err) {
      console.log(err);
    },

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
    },

    _handleBackPage() {
      this.props.navigator.pop();
    },

    _handleFwdPage() {
      this.props.navigator.push({
        title: 'PhoodImage',
        component: InPhoodImage,
        passProps: {}
      });
    },

    render() {
        return (
            <ScrollView style={styles.container}>
              <TouchableHighlight onPress={this._handleBackPage.bind(this)}>
                <View style={styles.buttonNavLeft}>
                  <Text style={styles.buttonTextNav}>Camera</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={this._handleFwdPage.bind(this)}>
              <View style={styles.buttonNavRight}>
                <Text style={styles.buttonTextNav}>Image</Text>
              </View>
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
});

module.exports = CameraRollExample;
