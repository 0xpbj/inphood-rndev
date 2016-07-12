 /* @flow */

'use strict';
import React, { Component } from 'react';
import {
 ActionSheetIOS,
 CameraRoll,
 ListView,
 StyleSheet,
 NavigatorIOS,
 Text,
 TouchableOpacity,
 View,
 Platform,
} from 'react-native';

import PhotoBrowser from 'react-native-photo-browser';

class InPhoodCollage extends Component {
  constructor(props) {
    super(props);
    this._onSelectionChanged = this._onSelectionChanged.bind(this)
    this._onActionButton = this._onActionButton.bind(this)
    this._handleBackPage = this._handleBackPage.bind(this)
    this.state = {
      dsiplayActionButton: true,
      displayNavArrows: true,
      displaySelectionButtons: true,
      startOnGrid: true,
      enableGrid: true,
      media: this.props.media,
      initialIndex: 0,
    };
  }

  _onSelectionChanged(media, index, selected) {
    alert(`${media.photo} selection status: ${selected}`);
  }

  _handleBackPage() {
    this.props.navigator.pop();
  }

  _onActionButton(media, index) {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showShareActionSheetWithOptions({
        url: media.photo,
        message: media.caption,
      },
      () => {},
      () => {});
    } else {
      alert(`handle sharing on android for ${media.photo}, index: ${index}`);
    }
  }

  render() {
    return (
      <PhotoBrowser
        onBack={this._handleBackPage}
        mediaList={this.state.media}
        initialIndex={this.state.initialIndex}
        displayNavArrows={this.state.displayNavArrows}
        displaySelectionButtons={this.state.displaySelectionButtons}
        displayActionButton={this.state.displayActionButton}
        startOnGrid={this.state.startOnGrid}
        enableGrid={this.state.enableGrid}
        //useCircleProgress
        onSelectionChanged={this._onSelectionChanged}
        onActionButton={this._onActionButton}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    paddingTop: 54,
    paddingLeft: 16,
  },
  row: {
    flex: 1,
    padding: 8,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
  },
  rowTitle: {
    fontSize: 14,
  },
  rowDescription: {
    fontSize: 12,
  },
});

module.exports = InPhoodCollage;
