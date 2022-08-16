import React from 'react';
import styled from 'styled-components/native';
import {StyleSheet, Text} from 'react-native';

const Container = styled.TouchableOpacity`
  border-radius: 7px;
  width: 19%;
  height: 95%;
  background-color: white;
  justify-content: center;
  align-items: center;
  margin: auto 0.5%;
`;
const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 17,
  },
});

function MarketMainBottomHomeButton(props) {
  return (
    <Container>
      <Text onPress={props.onPress} style={styles.text}>
        홈
      </Text>
    </Container>
  );
}

export default MarketMainBottomHomeButton;
