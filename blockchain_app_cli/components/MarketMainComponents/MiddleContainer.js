import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {Platform, StyleSheet, FlatList, View} from 'react-native';
import MarketItem from './MarketItem';

var heightValue = Platform.OS === 'ios' ? 75 : 67;
var borderpx = Platform.OS === 'ios' ? 0.5 : 2.0;
var borderColor = Platform.OS === 'ios' ? 192 : 220;
const Container = styled.SafeAreaView`
  width: 95%;
  height: ${heightValue}%;
  background-color: white;
  margin: 0 auto;
  margin-bottom: 5%;
  border-radius: 7px;
  border: ${borderpx}px solid
    rgba(${borderColor}, ${borderColor}, ${borderColor}, 1);
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
            image={item.image}
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
