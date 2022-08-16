import React from 'react';
import RemittanceOneThreeContainer from '../components/RemittanceOneThreeComponents/RemittanceOneThreeContainer';

//최상단 로와 송금 텍스트
import RemittanceOneThreeTopSmallContainer from '../components/RemittanceOneThreeComponents/RemittanceOneThreeTopSmallContainer';

//최상단 바로 밑 지불가격을 선택해주세요 텍스트
import TopMiddleText from '../components/RemittanceOneThreeComponents/TopMiddleText';

import InputAndConfirmBtn from '../components/RemittanceOneThreeComponents/InputAndConfirmBtn';

import MiddleContainer from '../components/RemittanceOneThreeComponents/MiddleContainer';

import BottomContainer from '../components/RemittanceOneThreeComponents/BottomContainer';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import qs from 'qs';

import {Alert} from 'react-native';
//const PaymentOneThree: () => Node = ({navigation, route}) => {
//function RemittanceOneThree({navigation, route}) {
const RemittanceOneThree: () => Node = ({navigation, route}) => {
  console.disableYellowBox = true;
  const [password, setPassword] = React.useState('');

  var receiverAccountAddress = route.params.data.recevierAddress;
  var amountValue = route.params.data.amount;

  function execute() {
    var dataSet = route.params.data;

    AsyncStorage.getItem('userinformation', (err, result) => {
      const UserInfo = JSON.parse(result);

      return UserInfo;
    }).then(UserInfo => {
      const UserInfo2 = JSON.parse(UserInfo);
      var dataSet2 = {
        userId: UserInfo2['userid'],
        userPassword: password,
        senderAddress: UserInfo2['userAccount'],
        receiverAddress: dataSet.recevierAddress,
        amount: dataSet.amount,
      };

      axios({
        method: 'POST',
        url: `http://220.67.231.91:80/hscRemittance`,
        data: qs.stringify(dataSet2),
      })
        .then(res => {
          const result = res.data;

          var successCode = result['SUCCESS_CODE'];
          if (successCode == 100) {
            console.log(`송금 성공`);
            console.log(`서버와 연결 성공`);
            console.log(`비밀번호 확인 성공`);
            navigation.navigate('TransactionAni');
          } else if (successCode == 201) {
            console.log('잔액 부족');
            // 201번 alert
            //alert
            Alert.alert(
              '송금 실패',
              '잔액 부족',
              [
                {
                  text: '확인',
                  onPress: () => console.log('사용불가능'),
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
            //alert
            // 201번 alert
          } else if (successCode == 202) {
            console.log('비밀번호 확인실패');
            // 202번 alert
            //alert
            Alert.alert(
              '송금 실패',
              '비밀번호 확인불가',
              [
                {
                  text: '확인',
                  onPress: () => console.log('사용불가능'),
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
            //alert
            // 202번 alert
          } else if (successCode == 200) {
            console.log('비밀번호 확인실패');
            // 202번 alert
            //alert
            Alert.alert(
              '송금 실패',
              '지갑주소 확인불가',
              [
                {
                  text: '확인',
                  onPress: () => console.log('사용불가능'),
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
            //alert
            // 202번 alert
          }

          //201 잔액부족

          //100 성공

          //202 비밀번호
          //navigation.goBack();
        })
        .catch(error => {
          console.log(`서버와 연결 실패 ${error}`);

          throw new Error(error);
        });
    });
  }
  return (
    <RemittanceOneThreeContainer>
      <RemittanceOneThreeTopSmallContainer />
      <TopMiddleText />
      <InputAndConfirmBtn
        onChangeText={value => {
          setPassword(value);
        }}
        onPress={() => {
          execute();
        }}
      />

      <MiddleContainer
        textvalue={receiverAccountAddress}
        amountvalue={amountValue}
      />

      <BottomContainer />
    </RemittanceOneThreeContainer>
  );
};

export default RemittanceOneThree;
