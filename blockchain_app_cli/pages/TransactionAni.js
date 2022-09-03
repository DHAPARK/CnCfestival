import * as React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Video from 'react-native-video';
import IPCONFIG from '../config/IpConfig';
function TransactionAni({navigation, route}) {
  console.disableYellowBox = true;

  const video = React.useRef(null);
  const styles = StyleSheet.create({
    video: {
      alignSelf: 'center',
      width: '50%',
      height: '50%',
    },
    container: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
  });
  async function tranAni() {
    //video.current.playAsync();
    let promise = new Promise((res, rej) => {
      setTimeout(() => {
        res();
        navigation.navigate('Index');
      }, 5300);
    });
    await promise;
  }

  return (
    <View style={styles.container}>
      <Video
        //ref={video}
        style={styles.video}
        source={require('../image/MP4_transaction_0.mp4')}
        onLoadStart={() => tranAni()}
        resizeMode="contain"
      />
    </View>
  );
}

export default TransactionAni;
