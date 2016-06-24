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
    this.props.navigator.push({
      title: 'PhoodData',
      component: InPhoodData,
      passProps: {
        token: this.props.token,
        profile: this.props.profile,
        client: this.props.client,
        trainer: this.props.trainer,
        photo: this.props.photo,
        image: this.props.selected,
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
