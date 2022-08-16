import React, {useState, useEffect} from 'react';
import type {Node} from 'react';

import MarketMainContainer from '../components/MarketMainComponents/MarKetMainContainer';
import MarketMainTopSmallContainer from '../components/MarketMainComponents/MarketMainTopSmallContainer';
import MarketMainBottomNavList from '../components/MarketMainComponents/MarketMainBottomNavList';
import MiddleContainer from '../components/MarketMainComponents/MiddleContainer';
import axios from 'axios';
import qs from 'qs';

//alert를 띄우기위한 import
import {Alert} from 'react-native';

const MarketMain: () => Node = () => {
  //var getItemList = '';
  const [getItemList, setItemList] = useState('');
  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://220.67.231.91:80/getProductInfoList`,
    }).then(res => {
      console.log(res.data);
      //getItemList = res.data;
      setItemList(res.data);
    });
  }, []);

  console.log(`모다냥  ${getItemList} 모다냥 `);

  return (
    <MarketMainContainer>
      <MarketMainTopSmallContainer />
      <MiddleContainer allData={getItemList} />
      <MarketMainBottomNavList />
    </MarketMainContainer>
  );
};

export default MarketMain;
