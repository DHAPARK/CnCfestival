import React from 'react';
import styled from 'styled-components/native';
import {Platform, StyleSheet, Text} from 'react-native';
//첫 버튼 (홈)
import MarketMainBottomHomeButton from './MarketMainBottomHomeButton';
import MarketMainBottomOfficialButton from './MarketMainBottomOfficialButton';
import MarketMainBottomMarketButton from './MarketMainBottomMarketButton';
import MarketMainBottomUseListButton from './MarketMainBottomUseListButton';
import MarketMainBottomOnlineMarketButton from './MarketMainBottomOnlineMarketButton';

import {useNavigation} from '@react-navigation/native';

import {Dimensions} from 'react-native';
import IPCONFIG from '../../config/IpConfig';
var ScreenHeight = Dimensions.get('window').height;
var ScreenWidth = Dimensions.get('window').width;

if (Platform.OS === 'ios') {
  ScreenHeight = ScreenHeight * 0.93;
  ScreenWidth = ScreenWidth * 0.02;
} else {
  ScreenHeight = ScreenHeight * 0.9;
  ScreenWidth = ScreenWidth * 0.02;
}
const Container = styled.SafeAreaView`
  width: 95%;
  height: 5%;
  background-color: white;
  border: 1px solid gray;
  border-radius: 7px;
  flex-direction: row;

  position: absolute;
  top: ${ScreenHeight}px;
  left: ${ScreenWidth}px;
`;

function MarketMainBottomNavList() {
  const navigation = useNavigation();
  return (
    <Container style={styles.shadow}>
      <MarketMainBottomHomeButton
        onPress={() => navigation.navigate('Index')}
      />
      <MarketMainBottomOfficialButton
        onPress={() => navigation.navigate('Notice')}
      />
      <MarketMainBottomMarketButton
        onPress={() => navigation.navigate('Franchisee')}
      />
      <MarketMainBottomUseListButton
        onPress={() => navigation.navigate('UsageHistory')}
      />
      <MarketMainBottomOnlineMarketButton
        onPress={() => navigation.navigate('MarketMain')}
      />
    </Container>
  );
}
const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#95B3D7',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.5,
        shadowRadius: 2.8,
      },
      android: {
        elevation: 20,
      },
    }),
  },
});

export default MarketMainBottomNavList;
