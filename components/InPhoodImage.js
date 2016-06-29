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
      uri: this.props.photo,
      type: 'image/jpeg',
      name: 'image1.jpg',
    }

    // Access Key ID:
    // AKIAJOFOQUG7CWPJKQLA
    // Secret Access Key:
    // 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

    // CDN User:
    // Access Key ID:
    // AKIAI25XHNISG4KDDM3Q
    // Secret Access Key:
    // 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

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
      console.log(response.body);
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
      <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1, }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight onPress={this._handleBackPage}>
            <Icon
              name="ios-photos"
              size={30}
              color="#4F8EF7"
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={this._handleFwdPage}>
            <Icon
              name="ios-share"
              size={30}
              color="#4F8EF7"
            />
          </TouchableHighlight>
        </View>
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
    );
  }
};

var styles = StyleSheet.create({
  base: {
    width: 38,
    height: 38,
  },
  default: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    padding: 4,
  },
  progress: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    width: 100
  },
  leftMargin: {
    marginLeft: 10,
  },
  background: {
    backgroundColor: '#222222'
  },
  sectionText: {
    marginVertical: 6,
  },
  nestedText: {
    marginLeft: 12,
    marginTop: 20,
    backgroundColor: 'transparent',
    color: 'white'
  },
  resizeMode: {
    width: 90,
    height: 60,
    borderWidth: 0.5,
    borderColor: 'black'
  },
  resizeModeText: {
    fontSize: 11,
    marginBottom: 3,
  },
  icon: {
    width: 15,
    height: 15,
  },
  horizontal: {
    flexDirection: 'row',
  },
  gif: {
    flex: 2,
    height: 200,
  },
  base64: {
    flex: 1,
    height: 50,
    resizeMode: 'contain',
  },
});

module.exports = InPhoodImage;
