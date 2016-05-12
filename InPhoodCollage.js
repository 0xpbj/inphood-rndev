/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';

import CameraRoll from 'rn-camera-roll';

class FoodImage extends Component {
  render() {

    /*console.log("FoodImage Props:");
    console.log(this);*/

      /* current image uri's:
          https://s3.amazonaws.com/static.caloriecount.about.com/images/medium/bananas-170061.jpg
          https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjkIod6Vy7I83bsejHc3eGX0CdTgqugiSuOXjcw-pKa7EMVsmzWA
          https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQkDAhkRotNhcRD2XKejg7YDju4j27twyDXHg6VC280EU3NYnwK
          https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSRXEYDNQEGCZv_RFee9YIIrj32aCPA6tEHHnCCWMiTDJZh2QDp
          https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSxyQ5UxODEz093JHQR9HE6o5JAA4V1YSoVliAcrr1bdS9L4vwu
       */

    return (
      <Image 
        style={styles.cellStyle}
        source={require('./img/exampleBanana.jpg')}
      />
    );
  }
}

class FoodImageList extends Component {
  render() {

    /*console.log("FoodImageList Props:");
    console.log(this);*/

    return (
      <View style={styles.flexStyle}>
        <Text style={styles.dayTextStyle}>Day</Text>
        <View style={styles.flexStyle}>
          <ScrollView horizontal={false} style={styles.dayColumnStyle}>

            <FoodImage />
            <FoodImage />
            <FoodImage />
            <FoodImage />
            <FoodImage />
            <FoodImage />
            <FoodImage />
            
          </ScrollView>
        </View>
      </View>
    );
  }
}

class InPhoodCollage extends Component {

  constructor(props) {
    super(props);
  }

  /* This will be a horizontal scroll view of vertical scroll views containing the user's food images.  Each one should be clickable
     enabling a quick comment and or icon (thumbs up/thumbs down).
  */
  render() {
    console.log("Collage Props");
    console.log(this);
    return (
      <View style={styles.collageContainer}>
        <View style={styles.height20Style}>
        </View>
        <ScrollView horizontal={true} style={styles.flexStyle}>

          <FoodImageList />
          <FoodImageList />
          <FoodImageList />
          <FoodImageList />
          <FoodImageList />

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  collageContainer: {
    flex: 1,
    margin: 0,
    backgroundColor: 'black',
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'left',
  },
  flexStyle: {
    flex: 1,
    flexDirection: 'column',
  },
  dayTextStyle: {
    margin: 0,
    width: 100,
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  dayColumnStyle: {
    height: 400,
  },
  cellStyle: {
    width: 100,
    height: 100,
    margin: 0,
    borderWidth: 1,
    borderColor: 'black',
  },
  height20Style: {
    height: 20,
  }
});

module.exports = InPhoodCollage;