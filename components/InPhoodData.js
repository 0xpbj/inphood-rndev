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
    // console.log(this)
  }
  _handleBackPage() {
    this.props.navigator.pop();
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

            <Text style={styles.baseText}>
              Firebase Data Transmitted!
            </Text>

          </View>

        </View>

        <View style={styles.quarterHeightContainer}>

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

          <TouchableHighlight
            onPress={this._handleBackPage}
            underlayColor='white'
          >
            <Icon
              name="ios-paper"
              size={30}
              color="#3b5998"
              style={styles.marginStyle}
            />
          </TouchableHighlight>

        </View>

      </View>
    );
  }
};

var styles = StyleSheet.create({
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
  borderStyle: {
    borderBottomColor: '#3b5998',
    borderBottomWidth: 1,
  },
  marginStyle: {
    margin: 5,
  },
  gif: {
    flex: 2,
    height: 200,
  },
  baseText: {
    fontFamily: 'Helvetica',
    borderWidth: 0.5,
    borderColor: '#3b5998',
    padding: 4
  },
});

module.exports = InPhoodData;
