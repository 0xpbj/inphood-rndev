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


var fullImage = {uri: 'http://facebook.github.io/react/img/logo_og.png'};
var smallImage = {uri: 'http://facebook.github.io/react/img/logo_small_2x.png'};

var styles = StyleSheet.create({
  base: {
    width: 38,
    height: 38,
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

class InPhoodImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this._handleBackPage = this._handleBackPage.bind(this);
  }
  getInitialState() {
    return {
      text: '',
    };
  }
  componentDidMount() {
    const fetchParams = {
        first: 25,
    };
  }
  _handleBackPage() {
    this.props.navigator.pop();
  }
  render() {
    console.log(this.props);
    return (
      <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1, }}>
      <TouchableHighlight onPress={this._handleBackPage}>
        <View style={styles.buttonNavLeft}>
          <Text style={styles.buttonTextNav}>Collage</Text>
        </View>
        </TouchableHighlight>
        <Image
          style={styles.gif}
          source={{uri: this.props.image}}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      </View>
    );
  }
};

module.exports = InPhoodImage;
