import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {Platform, StyleSheet, FlatList, View} from 'react-native';
import MarketItem from './MarketItem';
const Container = styled.SafeAreaView`
  width: 90%;
  height: 70%;
  margin: 0 auto;
  border-radius: 7px;
  margin-top: 7%;
  border: 5px solid black;
`;

function MiddleContainer(props) {
  const [containerWidth, setContainerWidth] = useState(0);

  const margins = 39 * 2;
  const numColumns = 2;

  const DATA = props.allData;
  //console.log(`DATA : \n${DATA}\n끝`);
  //console.log(`DATA[0] : \n${JSON.stringify(DATA[0])}\n끝`);
  return (
    <Container style={{marginTop: 50}}>
      <View style={{paddingHorizontal: 33}}></View>
      <FlatList
        data={DATA}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 0,
        }}
        //onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
        renderItem={({item}) => (
          <MarketItem
            description={item.description}
            manufacturer={item.manufacturer}
            name={item.name}
            price={item.price}
            productId={item.productId}
            width={(containerWidth - margins) / numColumns}
          />
        )}
        keyExtractor={(item, index) => index}
        numColumns={numColumns}
      />
    </Container>
  );
}

export default MiddleContainer;
