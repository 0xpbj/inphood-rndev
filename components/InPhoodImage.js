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

class InPhoodImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
    };
    this._handleBackPage = this._handleBackPage.bind(this);
    this._handleFwdPage = this._handleFwdPage.bind(this);
    this.updateText = this.updateText.bind(this);
  }
  componentDidMount() {
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
      }
    });
  }
  updateText(text) {
    this.props.onCaptionChange(
      text,
    );
    this.setState({
      caption: text,
    });

    let file = {
      uri: this.props.image,
      type: 'image/jpeg',
      name: this.props.token + '/image' + Date.now() + '.jpg',
    }

    let options = {
      keyPrefix: "images/",
      bucket: 'inphoodimagescdn',
      region: 'us-west-2',
      accessKey: "AKIAI25XHNISG4KDDM3Q",
      secretKey: "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",
      successActionStatus: 201
    }

    RNS3.put(file, options)
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
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.threeQuarterHeightContainer}>

          <View style={styles.borderStyle}>

            <Image
              style={styles.gif}
              source={{uri: this.props.image}}
            />

            <TextInput
              autoCapitalize="none"
              placeholder="Describe your meal"
              returnKeyType="done"
              onSubmitEditing={(event) => this.updateText(event.nativeEvent.text)}
              style={styles.default}
            />

          </View>

        </View>

        <View style={styles.quarterHeightContainer}>

          {/*Placeholder to match buttonbar height in start/login page.*/}
          <View style={{height:60}}/>

          <View style={styles.buttonRowStyle}>

            <TouchableHighlight onPress={this._handleBackPage}>
              <Icon
                name="ios-photos"
                size={30}
                color="#3b5998"
                style={styles.marginStyle}
              />
            </TouchableHighlight>

            <TouchableHighlight onPress={this._handleFwdPage}>
              <Icon
                name="ios-share"
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
};

var styles = StyleSheet.create({
  borderStyle: {
    borderBottomColor: '#3b5998',
    borderBottomWidth: 1,
  },
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
  marginStyle: {
    margin: 5,
  },
  gif: {
    flex: 2,
    height: 200,
  },
  default: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#3b5998',
    flex: 1,
    fontSize: 13,
    padding: 4,
  },


});

module.exports = InPhoodImage;
