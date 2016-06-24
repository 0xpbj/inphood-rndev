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

class InPhoodData extends Component {
  constructor(props) {
    super(props);
    this._handleBackPage = this._handleBackPage.bind(this);
  }
  componentDidMount() {
    console.log(this)
  }
  _handleBackPage() {
    this.props.navigator.pop();
  }
  render() {
    return (
      <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1, }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight onPress={this._handleBackPage}>
            <Icon
              name="ios-paper"
              size={30}
              color="#4F8EF7"
            />
          </TouchableHighlight>
        </View>
        <Image
          style={styles.gif}
          source={{uri: this.props.image}}
        />
        <Image
          source={{uri: this.props.profile}}
          style={{
            width: 60,
            height: 60,
            marginBottom: 10,
            borderRadius: 30,
            // backgroundColor: 'transparent',
            // marginRight: 10,
          }}
        />
        <Text style={styles.baseText}>
          DATA DUMP! {'\n'}
          {/*Token: {this.props.token + '\n'}*/}
          {/*Profile: {this.props.profile + '\n'}*/}
          Client: {this.props.client + '\n'}
          Trainer: {this.props.trainer + '\n'}
          Photo: {this.props.photo + '\n'}
          Image: {this.props.image + '\n'}
          Caption: {this.props.caption + '\n'}
        </Text>
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
  },  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

module.exports = InPhoodData;
