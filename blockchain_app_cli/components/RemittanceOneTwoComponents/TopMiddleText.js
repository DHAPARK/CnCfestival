import React from 'react';
import styled from 'styled-components/native';
import SmallContainer from './SmallContainer';
import IPCONFIG from '../../config/IpConfig';
const Label = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;

function TopMiddleText() {
  return (
    <SmallContainer>
      <Label>송금가격을 </Label>
      <Label>선택해주세요</Label>
    </SmallContainer>
  );
}

export default TopMiddleText;
