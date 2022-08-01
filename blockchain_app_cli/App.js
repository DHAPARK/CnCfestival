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
import Login from './pages/Login';
import Regist from './pages/Regist';
//페이지들

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
          name="Regist"
          component={Regist}
          options={{title: '회원가입', headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
