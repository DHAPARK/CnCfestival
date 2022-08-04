import * as React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Video from 'react-native-video';

const LoginAni: () => Node = ({navigation, route}) => {
  //const Regist: () => Node = ({navigation}) => {
  console.disableYellowBox = true;
  //var dataSet = route.params.data;
  //console.log(`PaymentOneThree 넘어온값 : ${JSON.stringify(dataSet)}`);
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
  async function loginAni() {
    //video.current.playAsync();
    console.log('여기 오긴하나..?');
    /*
    let promise = new Promise(resolve => {
      setTimeout(resolve, 5300);
    });
    */
    let promise = new Promise((res, rej) => {
      setTimeout(() => {
        res();
        navigation.navigate('Index');
      }, 5300);
    });
    await promise;
  }
  /*
  function loginAni1() {
    console.log('찍히긴하나');
  }
  */
  return (
    <View style={styles.container}>
      <Video
        /*
        ref={video}
        style={styles.video}
        source={require('../image/MP4_login.mp4')}
        onLoadStart={() => loginAni()}
        resizeMode="contain"
    */
        source={require('../image/MP4_login.mp4')}
        style={styles.video}
        onLoadStart={() => loginAni()}
        resizeMode={'contain'}
        //ref={video}
        //paused={false} // 재생/중지 여부
        //onLoadStart={() => vedio.current.playAsync()}
        //repeat={true}

        // onPlaybackStatusUpdate={() => navigation.navigate('Index')}
      />
    </View>
  );
};

export default LoginAni;
