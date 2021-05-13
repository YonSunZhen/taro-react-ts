import React from 'react';
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui';
import Taro from '@tarojs/taro';

export function Me() {

  const login = () => {
    Taro.navigateTo({
      url: '/pages/login/login'
    })
  }


  return (
    <View>
      Me
      <AtButton type='primary' onClick={login}>退出登陆</AtButton>
    </View>
  );
}
