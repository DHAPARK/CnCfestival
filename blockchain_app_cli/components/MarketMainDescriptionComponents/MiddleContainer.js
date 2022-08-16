import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {Platform, StyleSheet, Text} from 'react-native';

import {Image} from 'react-native';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';
import {useNavigation} from '@react-navigation/native';

const ImageAreaView = styled.SafeAreaView`
  width: 100%;
  height: 50%;
  background-color: red;
  margin-bottom: 4%;
`;

const ItemNameTextView = styled.Text`
  width: 100%;
  height: 15%;
  color: black;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const ItemPriceTextView = styled.Text`
  width: 100%;
  height: 15%;
  color: black;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

const ItemIdTextView = styled.Text`
  width: 100%;
  height: 0%;
  color: black;
`;

const ItemDescriptionTextView = styled.Text`
  width: 100%;
  height: 15%;
  color: black;
  text-align: center;
`;

const ItemManufacturerTextView = styled.Text`
  width: 100%;
  height: 0%;
  color: black;
`;

const Container = styled.SafeAreaView`
  width: 90%;
  height: 80%;
  margin: 0 auto;
  border-radius: 7px;
  margin-top: 7%;
  border: 5px solid black;
`;
const PurchaseBtn = styled.TouchableOpacity`
  width: 100%;
  height: 10%;
  color: black;
  border: 1px solid red;
  background-color: white;
`;
const TextInPurchaseBtn = styled.Text`
  margin: 0 auto;
  text-align: center;
  font-size: 20px;
  padding-top: 5%;
`;

function MiddleContainer(props) {
  const navigation = useNavigation();

  const [account, setAccount] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userinformation', (err, result) => {
      const UserInfo = JSON.parse(result);

      //setAccount(UserInfo['userAccount']);
      setAccount(UserInfo);
    });
  }, []);

  //console.log(`UserInfo에 account에 뭐오지 : ${account}`);
  console.log(`UserInfo에 account에 뭐오지 : ${JSON.stringify(account)}`);

  console.log(`account.userid에 뭐오지 : ${account.userid}`);
  console.log(`account.userAccount에 뭐오지 : ${account.userAccount}`);

  function purchaseItem() {
    axios({
      method: 'POST',
      url: `http://220.67.231.91:80/buyProductRequest`,
      data: {
        userId: account.userid,
        userPassword: account.userpw,
        senderAddress: account.userAccount,
        receiverAddress: props.itemInfo.manufacturer,
        amount: props.itemInfo.price,
        productName: props.itemInfo.name,
      },
    }).then(res => {
      console.log(`res는 ${JSON.stringify(res.data)}`);
      if (res.data['SUCCESS_CODE'] == 100) {
        console.log('성공');
        navigation.navigate('TransactionAni');
      } else if (res.data['SUCCESS_CODE'] == 200) {
        console.log('송신측 주소 없음');
      } else if (res.data['SUCCESS_CODE'] == 201) {
        console.log('잔액부족');
      } else if (res.data['SUCCESS_CODE'] == 202) {
        console.log('비밀번호 오류');
      }
    });
  }

  return (
    <Container>
      <ImageAreaView>
        <Image
          source={{
            uri: 'https://storage.googleapis.com/hscoin-d8ff7.appspot.com/test_img1.jpeg?GoogleAccessId=firebase-adminsdk-unmpe%40hscoin-d8ff7.iam.gserviceaccount.com&Expires=1913382000&Signature=sko1Qjgr0C33aLV86%2BYZ4ny1qbfEILl9iaxWyymnXf2nfZHB7G%2FIcf6oSiW2lXLRXRgqo0l7EYWR%2FijTOM1C0bKeMpWwncsNJ0bs3q35EHzgNPmqnIfuAUJ53IF1xGs3Y4wlooLZHqBxT5a0D8jJVPWVjygesWQdykufKFdSnwYGNXVQTsk9PXfVYgDKFIGJ6RVyvibdVA3jgGJvCScrTwX4dV%2B0xMPF%2B%2BRkjUtv%2FhxfG4zPeScNMKxqWFvo83EPy0c3gJ%2BrmgpAcM58QaF5v2swD%2BjSb5hmb4wMTZlks4paNYI%2BTO%2FDb6%2BfskvqDGWDzGtbLrBr4%2B9lg3MA3qzi5g%3D%3D',
          }}
          style={{width: '100%', height: '100%'}}></Image>
      </ImageAreaView>

      <ItemNameTextView>{props.itemInfo.name}</ItemNameTextView>

      <ItemDescriptionTextView>
        {props.itemInfo.description}
      </ItemDescriptionTextView>

      <ItemPriceTextView>가격 : {props.itemInfo.price} HSC</ItemPriceTextView>

      <ItemManufacturerTextView>
        {props.itemInfo.manufacturer}
      </ItemManufacturerTextView>

      <ItemIdTextView>{props.itemInfo.productId}</ItemIdTextView>
      <PurchaseBtn onPress={purchaseItem}>
        <TextInPurchaseBtn>구매</TextInPurchaseBtn>
      </PurchaseBtn>
    </Container>
  );
}

export default MiddleContainer;
