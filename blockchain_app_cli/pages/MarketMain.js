import React from 'react';
import type {Node} from 'react';

import MarketMainContainer from '../components/MarketMainComponents/MarKetMainContainer';
import MarketMainTopSmallContainer from '../components/MarketMainComponents/MarketMainTopSmallContainer';
import MarketMainBottomNavList from '../components/MarketMainComponents/MarketMainBottomNavList';

import axios from 'axios';
import qs from 'qs';

//alert를 띄우기위한 import
import {Alert} from 'react-native';

const MarketMain: () => Node = () => {
  axios({
    method: 'GET',
    url: `http://220.67.231.91:80/getProductInfoList`,
    //data: qs.stringify(data),
  }).then(res => {
    console.log(res.data);
  });

  return (
    <MarketMainContainer>
      <MarketMainTopSmallContainer />

      <MarketMainBottomNavList />
    </MarketMainContainer>
  );
};

export default MarketMain;
