import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import QRCode from 'react-native-qrcode-svg';
import IPCONFIG from '../../config/IpConfig';
const MyView = styled.SafeAreaView`
  align-items: center;
  background-color: #ecf0f1;
  position: absolute;
  z-index: 3;
  top: 38%;
  left: 35.5%;
`;

function Simple(props) {
  return (
    <QRCode
      value={JSON.stringify(props.props.value)}
      size={70}
      color="white"
      backgroundColor="black"
    />
  );
}
function QRarea(props) {
  console.log(`props체크1 ${props}`);
  console.log(`props체크2 ${JSON.stringify(props)}`);
  console.log(`props체크3 ${props.value}`);
  return (
    <MyView style={styles.container}>
      <View
        style={{
          width: 60,
          height: 60,
          flexDirection: 'row',
          backgroundColor: 'yellow',
          alignItems: 'center',
        }}>
        <Simple props={props} />
        {/*<Simple props={props} />*/}
      </View>

      {/*<CustomQRCodes />*/}
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default QRarea;
