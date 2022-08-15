/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';

import styled from 'styled-components';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Item = styled.TouchableOpacity`
  background-color: yellow;
  width: 150px;
  height: 170px;
  margin: 20px;
`;

const App: () => Node = () => {
  const [containerWidth, setContainerWidth] = useState(0);

  const margins = 39 * 2;
  const numColumns = 2;

  const DATA = [
    {
      title: 1,
    },
    {
      title: 2,
    },
    {
      title: 3,
    },
    {
      title: 4,
    },
    {
      title: 5,
    },
    {
      title: 6,
    },
    {
      title: 7,
    },
  ];

  return (
    <SafeAreaView style={{marginTop: 0}}>
      <View style={{paddingHorizontal: 33}}></View>
      <FlatList
        data={DATA}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 0,
        }}
        //onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
        renderItem={({item}) => (
          <Item
            title={item.title}
            width={(containerWidth - margins) / numColumns}
          />
        )}
        keyExtractor={(item, index) => index}
        numColumns={numColumns}
      />
    </SafeAreaView>
  );
};

export default App;
