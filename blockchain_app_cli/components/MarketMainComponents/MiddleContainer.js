import React from 'react';
import styled from 'styled-components/native';
import {Platform, StyleSheet} from 'react-native';

const Container = styled.SafeAreaView`
  width: 90%;
  height: 50%;
  margin: 0 auto;
  border-radius: 7px;
  margin-top: 7%;
`;

function MiddleContainer() {
  return <Container></Container>;
}

export default MiddleContainer;
