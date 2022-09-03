import React, {useState, useEffect} from 'react';
import type {Node} from 'react';

import styled from 'styled-components';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IPCONFIG from '../../config/IpConfig';
const Container = styled.TouchableOpacity`
  width: 38%;
  height: 170px;
  margin: 20px;
  margin-bottom: 0px;
  background-color: white;
`;

const ImageAreaView = styled.SafeAreaView`
  width: 100%;
  height: 65%;
  border: 1px solid white;
  border-radius: 15px;
`;

const ItemNameTextView = styled.Text`
  width: 100%;
  height: 23%;
  color: black;
  text-align: center;
`;

const ItemPriceTextView = styled.Text`
  width: 100%;
  height: 15%;
  color: black;
  text-align: center;
`;

const ItemIdTextView = styled.Text`
  width: 100%;
  height: 0%;
  color: black;
`;

const ItemDescriptionTextView = styled.Text`
  width: 100%;
  height: 0%;
  color: black;
`;

const ItemManufacturerTextView = styled.Text`
  width: 100%;
  height: 0%;
  color: black;
`;

//const Login: () => Node = ({navigation}) => {
const MarketItem: () => Node = props => {
  const navigation = useNavigation();
  function goDescriptionPage() {
    var data = {
      name: props.name,
      price: props.price,
      description: props.description,
      manufacturer: props.manufacturer,
      productId: props.productId,
      image: props.image,
    };
    navigation.navigate('MarketMainDescription', {data: data});
  }
  return (
    <Container onPress={goDescriptionPage}>
      <ImageAreaView>
        <Image
          style={{width: '100%', height: '100%', borderRadius: 15}}
          source={{
            uri: props.image,
          }}></Image>
      </ImageAreaView>

      <ItemNameTextView>{props.name}</ItemNameTextView>
      <ItemPriceTextView>{props.price} HSC</ItemPriceTextView>

      <ItemDescriptionTextView>{props.description}</ItemDescriptionTextView>
      <ItemManufacturerTextView>{props.manufacturer}</ItemManufacturerTextView>
      <ItemIdTextView>{props.productId}</ItemIdTextView>
    </Container>
  );
};

export default MarketItem;
