'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

// const FBSDK = require('react-native-fbsdklogin');
// const {
//   LoginButton,
// } = FBSDK;

// class InPhoodFBLogin extends Component {
//   render() {
//     return (
//       <View>
//         <LoginButton
//           publishPermissions={["publish_actions"]}
//           onLoginFinished={
//             (error, result) => {
//               if (error) {
//                 alert("login has error: " + result.error);
//               } else if (result.isCancelled) {
//                 alert("login is cancelled.");
//               } else {
//                 alert("login has finished with permissions: " + result.grantedPermissions)
//               }
//             }
//           }
//           onLogoutFinished={() => alert("logout.")}/>
//       </View>
//     );
//   }
// };

class InPhoodFBLogin extends Component {
  render() {
    return (
      <View style={styles.container}> 
        <Text style={styles.welcome}>
          Social Login Placeholder
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});

module.exports = InPhoodFBLogin;