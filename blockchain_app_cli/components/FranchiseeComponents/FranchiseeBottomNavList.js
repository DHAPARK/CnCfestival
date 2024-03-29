import React from 'react';
import styled from 'styled-components/native';
import {Platform, StyleSheet, Text} from 'react-native';
//첫 버튼 (홈)
import FranchiseeBottomHomeButton from './FranchiseeBottomHomeButton';
import FranchiseeBottomOfficialButton from './FranchiseeBottomOfficialButton';
import FranchiseeBottomMarketButton from './FranchiseeBottomMarketButton';
import FranchiseeBottomUseListButton from './FranchiseeBottomUseListButton';
import FranchiseeBottomOnlineMarketButton from './FranchiseeBottomOnlineMarketButton';
import IPCONFIG from '../../config/IpConfig';
import {useNavigation} from '@react-navigation/native';

import {Dimensions} from 'react-native';

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

function FranchiseeBottomNavList() {
  const navigation = useNavigation();
  return (
    <Container style={styles.shadow}>
      <FranchiseeBottomHomeButton
        onPress={() => navigation.navigate('Index')}
      />
      <FranchiseeBottomOfficialButton
        onPress={() => navigation.navigate('Notice')}
      />
      <FranchiseeBottomMarketButton
        onPress={() => navigation.navigate('Franchisee')}
      />
      <FranchiseeBottomUseListButton
        onPress={() => navigation.navigate('UsageHistory')}
      />
      <FranchiseeBottomOnlineMarketButton
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

export default FranchiseeBottomNavList;
