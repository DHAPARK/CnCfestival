import React, {useEffect, useState, useRef} from 'react';
import type {Node} from 'react';
import styled from 'styled-components/native';
import _ from 'lodash';
import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Vibration,
  View,
  Platform,
} from 'react-native';
import PaymentOneContainer from '../components/PaymentOneComponents/PaymentOneContainer';
import PaymentOneTopSmallContainer from '../components/PaymentOneComponents/PaymentOneTopSmallContainer';
import PaymentOneMiddleText from '../components/PaymentOneComponents/PaymentOneMiddleText';

import PaymentOneBottomMyInfo from '../components/PaymentOneComponents/PaymentOneBottomMyInfo';

//import {BarCodeScanner} from 'expo-barcode-scanner';
import {Camera, CameraType} from 'react-native-camera-kit';
//import QRScanner from 'react-native-camera';

//index.js 에 쓰인 Text
const Text = styled.Text`
  font-size: 20px;
  line-height: 20px;
`;

//이부분은 PaymentOneTwo를 보기 위해 visible:false로 테두리 안에 QR코드를 스캔해주세요
//바로 밑부분에 놓은 컴포넌트
const GotoPaymentOneTwo = styled.TouchableOpacity`
  border: 1px solid black;
  border-radius: 15px;
  background-color: white;
  align-items: center;
  width: 100px;
  padding-top: 5px;
  height: 30px;
  margin: 0 auto;
`;

function PaymentOne({navigation}) {
  console.disableYellowBox = true;
  const [scaned, setScaned] = useState(true);
  const ref = useRef(null);
  useEffect(() => {
    // 종료후 재시작을 했을때 초기화
    setScaned(true);
  }, []);

  var dataSet = {
    userid: '',
    userpassword: '',
    senderAddress: '',
    recevierAddress: '',
    amount: '',
  };

  const onBarCodeRead = (event: any) => {
    if (!scaned) return;
    setScaned(false);
    Vibration.vibrate();
    var scannedData = event.nativeEvent.codeStringValue;
    console.log(
      `scannedData : ${scannedData} , scannedDataType : ${typeof scannedData}`,
    );
    Alert.alert('QR Code', scannedData, [
      {
        text: '주소확인',
        onPress: () => {
          setScaned(true);
          if (scannedData) {
            //여기서 navigation 쳐주면 될것같은데..
            dataSet['recevierAddress'] = scannedData;
            navigation.navigate('PaymentOneTwo', {data: dataSet});
          } else {
            Alert.alert(
              '결제 실패',
              'QR인식실패',
              [
                {
                  text: '확인',
                  onPress: () => console.log('사용불가능'),
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );

            console.log('scanData 든게 없습니다. Paymentone내부 오류');
            return false;
          }
        },
      },
    ]);
  };

  return (
    <PaymentOneContainer>
      <PaymentOneTopSmallContainer />

      <Camera
        style={styles.scanner}
        ref={ref}
        cameraType={CameraType.Back} // Front/Back(default)
        //zoomMode
        //focusMode
        // Barcode Scanner Props
        scanBarcode
        showFrame={false}
        laserColor="rgba(0, 0, 0, 0)"
        frameColor="rgba(0, 0, 0, 0)"
        surfaceColor="rgba(0, 0, 0, 0)"
        onReadCode={onBarCodeRead}
      />
    </PaymentOneContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanner: {
    flex: 1,
  },
});

export default PaymentOne;
