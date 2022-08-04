/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
//네비게이터 관련
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
//네비게이터 관련

//페이지들
import Index from './pages/Index';
import Login from './pages/Login';
import Regist from './pages/Regist';
import LoginAni from './pages/LoginAni';

import PaymentOne from './pages/PaymentOne';
import PaymentOneTwo from './pages/PaymentOneTwo';
import PaymentOneThree from './pages/PaymentOneThree';

import RemittanceOne from './pages/RemittanceOne';
import RemittanceOneTwo from './pages/RemittanceOneTwo';
import RemittanceOneThree from './pages/RemittanceOneThree';
//페이지들

import Notice from './pages/Notice';
import ModifyMyInfo from './pages/ModifyMyInfo';
import UsageHistory from './pages/UsageHistory';
import Franchisee from './pages/Franchisee';
//스플래시 스크린
import SplashScreen from 'react-native-splash-screen';
//스플래시 스크린
const App: () => Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: '로그인', headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="LoginAni"
          component={LoginAni}
          options={{title: '로그인 중', headerShown: false}}
        />
        <Stack.Screen
          name="Regist"
          component={Regist}
          options={{title: '회원가입', headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Index"
          component={Index}
          options={{title: '메인 화면', headerShown: false}}></Stack.Screen>

        <Stack.Screen
          name="PaymentOne"
          component={PaymentOne}
          options={{title: '결제 화면1', headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="PaymentOneTwo"
          component={PaymentOneTwo}
          options={{title: '결제 화면 2', headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="PaymentOneThree"
          component={PaymentOneThree}
          options={{title: '결제 화면 3', headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="RemittanceOne"
          component={RemittanceOne}
          options={{title: '송금 화면 1', headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="RemittanceOneTwo"
          component={RemittanceOneTwo}
          options={{title: '송금 화면 2', headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="RemittanceOneThree"
          component={RemittanceOneThree}
          options={{title: '송금 화면 3', headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Notice"
          component={Notice}
          options={{title: 'MyPage', headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="ModifyMyInfo"
          component={ModifyMyInfo}
          options={{title: '정보 수정', headerShown: false}}></Stack.Screen>

        <Stack.Screen
          name="Franchisee"
          component={Franchisee}
          options={{title: '가맹점', headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="UsageHistory"
          component={UsageHistory}
          options={{title: '이용내역', headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
