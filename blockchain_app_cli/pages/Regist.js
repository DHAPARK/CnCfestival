/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';

const Regist: ({}) => Node = () => {
  return (
    <SafeAreaView>
      <Text>회원가입페이지</Text>
      <TouchableOpacity onPress={() => {}}>
        <Text>버튼</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Regist;
