import React from 'react';
import styled from 'styled-components/native';

import {Platform, StyleSheet, Image} from 'react-native';
import {Dimensions} from 'react-native';
//import {Video} from 'expo-av';
import Video from 'react-native-video';

import logoVideo from '../../image/MP4_movelogo.mp4';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const margin_top = Platform.OS === 'ios' ? 0 : 10;
const margin_bottom = Platform.OS === 'ios' ? 0 : 10;

//m/ height 0.27->0.33 , margin-top + (ScreenHeight * 0.07) 수정
const Container = styled.SafeAreaView`
  margin: 0 auto;
  width: ${ScreenWidth * 0.8}px;
  height: ${ScreenHeight * 0.33}px;
  margin-top: ${margin_top + ScreenHeight * 0.07}px;
  margin-bottom: ${margin_bottom}px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

function LoginPageLogo(props) {
  //const vedio = React.useRef(null);
  //const video = React.useRef(null);
  return (
    <Container onPress={props.onPress}>
      {/*<Label>{props.children}</Label>*/}
      <Video
        //backgroundColor="yellow"
        //source={require('../../image/MP4_movelogo.mp4')}
        source={logoVideo}
        //ref={video}
        style={styles.image}
        paused={false} // 재생/중지 여부
        //onLoadStart={() => vedio.current.playAsync()}
        //onLoad={() => video.current.playAsync()}
        resizeMode={'contain'}
        repeat={true}
      />
      {/* <Image source={require('../../image/LoginPageImage/HSC_logo.png')} style={styles.image}></Image> */}
    </Container>
  );
}
export default LoginPageLogo;
