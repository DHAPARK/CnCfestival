import React, {useState, useEffect} from 'react';
import type {Node} from 'react';

import MarketMainDescriptionContainer from '../components/MarketMainDescriptionComponents/MarketMainDescriptionContainer';
import MarketMainDescriptionTopSmallContainer from '../components/MarketMainDescriptionComponents/MarketMainDescriptionTopSmallContainer';
import MiddleContainer from '../components/MarketMainDescriptionComponents/MiddleContainer';
//const Index: () => Node = ({navigation, route}) => {

const MarketMainDescription: () => Node = ({navigation, route}) => {
  console.log(`검사 ${route.params.data.name}`);
  console.log(`검사 ${route.params.data.description}`);
  console.log(`검사 ${route.params.data.price}`);
  console.log(`검사 ${route.params.data.manufacturer}`);
  console.log(`검사 ${route.params.data.productId}`);

  const itemInfo = {
    name: route.params.data.name,
    description: route.params.data.description,
    price: route.params.data.price,
    manufacturer: route.params.data.manufacturer,
    productId: route.params.data.productId,
  };

  return (
    <MarketMainDescriptionContainer>
      <MarketMainDescriptionTopSmallContainer />
      <MiddleContainer itemInfo={itemInfo}></MiddleContainer>
    </MarketMainDescriptionContainer>
  );
};

export default MarketMainDescription;
