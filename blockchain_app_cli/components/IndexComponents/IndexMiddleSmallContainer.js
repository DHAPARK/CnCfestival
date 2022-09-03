import React from 'react';
import styled from 'styled-components/native';
import {StyleSheet, Image, Text} from 'react-native';
import Video from 'react-native-video';
import IPCONFIG from '../../config/IpConfig';
const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
});

const Container = styled.SafeAreaView`
  background-color: white;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  margin-top: 9%;
`;

function IndexMiddleSmallContainer() {
  const video = React.useRef(null);
  return (
    <Container>
      <Video
        /*
        source={require('../../image/LoginPageImage/MP4_movering.mp4')}
        ref={video}
        style={styles.image}
        onLoadStart={() => video.current.playAsync()}
        resizeMode="contain"
        isLooping
        */

        source={require('../../image/LoginPageImage/MP4_movering.mp4')}
        //ref={video}
        style={styles.video}
        paused={false} // 재생/중지 여부
        //onLoadStart={() => vedio.current.playAsync()}
        onLoad={e => console.log(e)}
        resizeMode={'contain'}
        repeat={true}
      />
    </Container>
  );
}

export default IndexMiddleSmallContainer;
