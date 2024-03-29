import React from 'react';
import styled from 'styled-components/native';
import {StyleSheet, Text} from 'react-native';
//import {WhiteBalance} from 'expo-camera/build/Camera.types';
import IPCONFIG from '../../config/IpConfig';
const Container = styled.TouchableOpacity`
  border-radius: 7px;
  width: 19%;
  height: 95%;
  background-color: #95b3d7;
  justify-content: center;
  align-items: center;
  margin: auto 0.5%;
`;
const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 17,
  },
});

function IndexBottomOfficialButton(props) {
  return (
    <Container>
      <Text onPress={props.onPress} style={styles.text}>
        마이
      </Text>
    </Container>
  );
}

export default IndexBottomOfficialButton;
