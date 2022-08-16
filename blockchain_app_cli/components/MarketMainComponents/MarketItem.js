import React, {useState, useEffect} from 'react';
import type {Node} from 'react';

import styled from 'styled-components';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const Container = styled.TouchableOpacity`
  width: 38%;
  height: 170px;
  margin: 20px;
  background-color: white;
`;

const ImageAreaView = styled.SafeAreaView`
  width: 100%;
  height: 65%;
  border: 1px solid blue;
`;

const ItemNameTextView = styled.Text`
  width: 100%;
  height: 15%;
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
    };
    navigation.navigate('MarketMainDescription', {data: data});
  }
  return (
    <Container onPress={goDescriptionPage}>
      <ImageAreaView>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{
            uri: 'https://storage.googleapis.com/hscoin-d8ff7.appspot.com/test_img1.jpeg?GoogleAccessId=firebase-adminsdk-unmpe%40hscoin-d8ff7.iam.gserviceaccount.com&Expires=1913382000&Signature=sko1Qjgr0C33aLV86%2BYZ4ny1qbfEILl9iaxWyymnXf2nfZHB7G%2FIcf6oSiW2lXLRXRgqo0l7EYWR%2FijTOM1C0bKeMpWwncsNJ0bs3q35EHzgNPmqnIfuAUJ53IF1xGs3Y4wlooLZHqBxT5a0D8jJVPWVjygesWQdykufKFdSnwYGNXVQTsk9PXfVYgDKFIGJ6RVyvibdVA3jgGJvCScrTwX4dV%2B0xMPF%2B%2BRkjUtv%2FhxfG4zPeScNMKxqWFvo83EPy0c3gJ%2BrmgpAcM58QaF5v2swD%2BjSb5hmb4wMTZlks4paNYI%2BTO%2FDb6%2BfskvqDGWDzGtbLrBr4%2B9lg3MA3qzi5g%3D%3D',
          }}></Image>
      </ImageAreaView>

      <ItemNameTextView>{props.name}</ItemNameTextView>
      <ItemPriceTextView>{props.price}</ItemPriceTextView>

      <ItemDescriptionTextView>{props.description}</ItemDescriptionTextView>
      <ItemManufacturerTextView>{props.manufacturer}</ItemManufacturerTextView>
      <ItemIdTextView>{props.productId}</ItemIdTextView>
    </Container>
  );
};

export default MarketItem;
