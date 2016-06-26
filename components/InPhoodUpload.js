'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  CameraRoll,
  DeviceEventEmitter,
  ActivityIndicatorIOS,
  Image,
  TouchableOpacity,
  Modal,
  Component,
} from 'react-native';

var RNUploader = require('NativeModules').RNUploader;
var InPhoodData = require('./InPhoodData');

class InPhoodUpload extends Component {
  constructor(props){
    super(props);
    this.state = {
      uploading: false,
      showUploadModal: false,
      uploadProgress: 0,
      uploadTotal: 0,
      uploadWritten: 0,
      uploadStatus: undefined,
      cancelled: false,
      images: [],
    }
  }

  componentDidMount(){
    DeviceEventEmitter.addListener('RNUploaderProgress', (data)=>{
      let bytesWritten = data.totalBytesWritten;
      let bytesTotal   = data.totalBytesExpectedToWrite;
      let progress     = data.progress;
      this.setState( { uploadProgress: progress, uploadTotal: bytesTotal, uploadWritten: bytesWritten } );
    });
  }

  _closeUploadModal(){
    this.setState( { showUploadModal: false, uploadProgress: 0, uploadTotal: 0, uploadWritten: 0, images: [], cancelled: false, } );
  }

  _cancelUpload(){
    RNUploader.cancel();
    this.setState( { uploading: false, cancelled: true } );
  }

  _uploadImages(){
    let files = [
        {
            name: 'file[]',
            filename: 'image1.jpg',
            filepath: this.props.photo,  // image from camera roll/assets library
            filetype: 'image/jpg',
        },
    ];

    var s3_policy = require('./s3_policy');

    let s3_opts = {
      bucket: 'inphoodcdn',
      region: 'us-west-1',
      key: 'AKIAIWC5HH7DLWQSR4ZQ',
      secret: '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',
      type: 'image/',
      path: 'images/',
      acl: 'public-read',
      expires: new Date(Date.now() + 60000),
      length: 10485760, // 10M as maximal size
    };

    let opts = {
      url: 'http://inphoodcdn.s3.amazonaws.com',
      files: files,
      method: 'POST',
    };

    this.setState({ uploading: true, showUploadModal: true, });
    RNUploader.upload( opts, ( err, res )=>{
      if( err ){
          console.log(err);
          return;
      }

      let status = res.status;
      let responseString = res.data;

      console.log('upload complete with status ' + status);
      console.log( responseString );
      this.setState( { uploading: false, uploadStatus: status } );
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

  uploadProgressModal(){
    let uploadProgress;

    if( this.state.cancelled ){
      uploadProgress = (
        <View style={{ margin: 5, alignItems: 'center', }}>
          <Text style={{ marginBottom: 10, }}>
            Upload Cancelled
          </Text>
          <TouchableOpacity style={ styles.button } onPress={ this._closeUploadModal.bind(this) }>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      );
    }else if( !this.state.uploading && this.state.uploadStatus ){
      uploadProgress = (
        <View style={{ margin: 5, alignItems: 'center', }}>
          <Text style={{ marginBottom: 10, }}>
            Upload complete with status: { this.state.uploadStatus }
          </Text>
          <TouchableOpacity style={ styles.button } onPress={ this._closeUploadModal.bind(this) }>
            <Text>{ this.state.uploading ? '' : 'Close' }</Text>
          </TouchableOpacity>
        </View>
      );
    }
    else if( this.state.uploading ){
      uploadProgress = (
        <View style={{ alignItems: 'center',  }}>
          <Text style={ styles.title }>Uploading { this.state.images.length } Image{ this.state.images.length == 1 ? '' : 's' }</Text>
          <ActivityIndicatorIOS
            animating={this.state.animating}
            style={[styles.centering, {height: 80}]}
            size="large" />
          <Text>{ this.state.uploadProgress.toFixed(0) }%</Text>
          <Text style={{ fontSize: 11, color: 'gray', marginTop: 5, }}>
            { ( this.state.uploadWritten / 1024 ).toFixed(0) }/{ ( this.state.uploadTotal / 1024 ).toFixed(0) } KB
          </Text>
          <TouchableOpacity style={ [styles.button, {marginTop: 5}] } onPress={ this._cancelUpload.bind(this) }>
            <Text>{ 'Cancel' }</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return uploadProgress;
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={ styles.title }>
          react-native-uploader example
        </Text>

        <Modal
          animated={false}
          transparent={false}
          visible={ this.state.showUploadModal }>

          <View style={ styles.modal }>
            { this.uploadProgressModal() }
          </View>

        </Modal>

        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>

          <TouchableOpacity style={ styles.button } onPress={ this._uploadImages.bind( this ) }>
            <Text>Upload</Text>
          </TouchableOpacity>

        </View>

        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', }}>
          { this.state.images.map( (image)=>{
            return <Image key={ _generateUUID() } source={{ uri: image.uri }} style={ styles.thumbnail } />
          })}
        </View>

      </View>
    );
  }
}

function _generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 20,
    paddingTop: 40,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail: {
    width: 73,
    height: 73,
    borderWidth: 1,
    borderColor: '#DDD',
    margin: 5,
  },
  modal: {
    margin: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'lightyellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
  },
  button: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#EEE',
    marginHorizontal: 5,
  }
});

module.exports = InPhoodUpload;
