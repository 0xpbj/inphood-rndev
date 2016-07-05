/* @flow */

'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  NavigatorIOS,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { RNS3 } from 'react-native-aws3';
var InPhoodData = require('./InPhoodData');
const Firebase = require('firebase');

class InPhoodImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      imageName: '',
    };
    this._handleBackPage = this._handleBackPage.bind(this);
    this._handleFwdPage = this._handleFwdPage.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  componentDidMount() {
    // console.log('\n\n\n Image Data')
    // console.log(this.props)
  }

  _handleBackPage() {
    this.props.navigator.pop();
  }

  _handleFwdPage() {
    this.props.navigator.push({
      title: 'PhoodData',
      component: InPhoodData,
      passProps: {
        token: this.props.token,
        profile: this.props.profile,
        client: this.props.client,
        trainer: this.props.trainer,
        photo: this.props.photo,
        image: this.props.image,
        caption: this.state.caption,
        imageName: this.state.imageName,
      }
    });
  }

  updateText(text) {
    let text1 = text.toLowerCase();
    this.setState({
      caption: text1,
    });

    let date = Date.now();
    let file_name = this.props.id + '/images/' + date + '.jpg';

    this.setState({
      imageName: file_name,
    });

    let imgfile = {
      uri: this.props.image,
      type: 'image/jpeg',
      name: file_name,
    }

    let options = {
      keyPrefix: "data/",
      bucket: 'inphoodimagescdn',
      region: 'us-west-2',
      accessKey: "AKIAI25XHNISG4KDDM3Q",
      secretKey: "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",
      successActionStatus: 201
    }

    RNS3.put(imgfile, options)
    .then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      // console.log(response.body);
      /**
       * {
       *   postResponse: {
       *     bucket: "your-bucket",
       *     etag : "9f620878e06d28774406017480a59fd4",
       *     key: "uploads/image.png",
       *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
       *   }
       * }
       */
    })
    .catch(err => console.log('Errors uploading: ' + err));

    let firebaseUrl = 'https://shining-torch-3197.firebaseio.com/';
    var myFirebaseRef = new Firebase(firebaseUrl);
    let caption_array = text1.split(' ');
    let fileNameRef = myFirebaseRef.child('file_name')
    let captionRef = myFirebaseRef.child('caption_tags')
    let fidRef = fileNameRef.child(this.props.id)
    let cidRef = captionRef.child(this.props.id)
    fidRef.push({
      file_name,
    });
    cidRef.push({
      caption_array,
    });

    this.props.navigator.push({
      title: 'PhoodData',
      component: InPhoodData,
      passProps: {
        token: this.props.token,
        profile: this.props.profile,
        client: this.props.client,
        trainer: this.props.trainer,
        photo: this.props.photo,
        image: this.props.image,
        caption: this.state.caption,
        imageName: this.state.imageName,
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.largeContainer}>

          <View style={styles.borderStyle}>

            <Image
              style={styles.image}
              source={{uri: this.props.image}}
            />

            <TextInput
              autoCapitalize="none"
              placeholder="Describe your meal"
              returnKeyType="done"
              onSubmitEditing={(event) => this.updateText(event.nativeEvent.text)}
              style={styles.textBarStyle}
            />

          </View>

        </View>

        <View style={styles.smallContainer}>

          {/*Placeholder to match buttonbar height in start/login page.*/}
          {/*<View style={{height:60}}/>*/}

          <View style={styles.buttonRowStyle}>

            <TouchableHighlight
              onPress={this._handleBackPage}
              underlayColor='white'
            >
              <Icon
                name="ios-photos"
                size={45}
                color="#3b5998"
                style={styles.marginStyle}
              />
            </TouchableHighlight>

            <TouchableHighlight
              onPress={this._handleFwdPage}
              underlayColor='white'
            >
              <Icon
                name="ios-share"
                size={45}
                color="#3b5998"
                style={styles.marginStyle}
              />
            </TouchableHighlight>

          </View>

        </View>

      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  largeContainer: {
    flex: 0.85,
  },
  borderStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#3b5998',
    flex: 1,
    backgroundColor: 'black'
  },
  image: {
    flex: 1,
    // height: 200,
    resizeMode: 'contain',
    // borderWidth: 0.5,
    // borderRadius: 5,
    // borderColor: '#3b5998',
    margin: 5,
    backgroundColor: 'black',
  },
  textBarStyle: {
    fontFamily: 'Helvetica',
    height: 26,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#3b5998',
    backgroundColor: 'white',
    // flex: 1,
    fontSize: 13,
    padding: 4,
    margin: 5,
  },

  smallContainer: {
    flex: 0.15,
    alignItems: 'center',
  },
  buttonRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  marginStyle: {
    margin: 5,
  },
});

module.exports = InPhoodImage;
